import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  EdgeLabelRenderer,
  BaseEdge,
  getStraightPath,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { Network } from "lucide-react";
import WordNode from "./WordNode";
import RelationPicker from "./RelationPicker";
import type { CorrectPair, Relation } from "../../../types/content";
import { relations } from "./relationConfig";
import { validateConnection } from "./validateConnection";

const nodeTypes: NodeTypes = { word: WordNode };

/** Standaard lijn / verbinding; fout-tijdelijke lijn gebruikt WRONG_EDGE_COLOR. */
const CONNECT_COLOR = "#4299E1";
const WRONG_EDGE_COLOR = "#F56565";

interface PendingConnection {
  source: string;
  target: string;
  sourceWord: string;
  targetWord: string;
  screenPos: { x: number; y: number };
}

// Custom labeled edge
function RelationEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  data?: { label: string; color: string; shaking?: boolean };
}) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const color = data?.color ?? CONNECT_COLOR;

  return (
    <>
      <motion.g
        animate={
          data?.shaking
            ? {
                x: [0, -6, 6, -6, 6, -4, 4, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              }
            : { x: 0 }
        }
      >
        <BaseEdge
          id={id}
          path={edgePath}
          style={{
            stroke: color,
            strokeWidth: 3,
            strokeLinecap: "round",
          }}
          markerEnd={`url(#arrow-${color.replace("#", "")})`}
        />
      </motion.g>
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-full px-3 py-1 text-xs font-bold shadow-sm border"
            style={{
              backgroundColor: color + "22",
              color: color,
              borderColor: color + "55",
              whiteSpace: "nowrap",
            }}
          >
            {data?.label}
          </motion.div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const edgeTypes = { relation: RelationEdge };

function CanvasInner({
  onUsedWordsChange,
  correctPairs,
}: {
  onUsedWordsChange: (ids: Set<string>) => void;
  correctPairs: CorrectPair[];
}) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [pendingConnection, setPendingConnection] =
    useState<PendingConnection | null>(null);

  // Track which words are on the canvas
  const getUsedWordIds = useCallback(
    (currentNodes: Node[]) =>
      new Set(currentNodes.map((n) => n.data.wordId as string)),
    []
  );

  const handleRemoveNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => {
        const updated = nds.filter((n) => n.id !== nodeId);
        onUsedWordsChange(getUsedWordIds(updated));
        return updated;
      });
      // Remove connected edges too
      setEdges((eds) =>
        eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
      );
    },
    [setNodes, setEdges, onUsedWordsChange, getUsedWordIds]
  );

  // When a word chip is dropped onto the canvas
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const wordId = e.dataTransfer.getData("application/word-id");
      const wordText = e.dataTransfer.getData("application/word-text");
      const wordHint = e.dataTransfer.getData("application/word-hint");
      const wordContext =
        e.dataTransfer.getData("application/word-context") ||
        e.dataTransfer.getData("application/word-hint");

      if (!wordId || !wordText) return;

      // Check not already on canvas
      if (nodes.some((n) => n.data.wordId === wordId)) return;

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode: Node = {
        id: `node-${wordId}-${Date.now()}`,
        type: "word",
        position,
        data: {
          word: wordText,
          hint: wordHint,
          contextSentence: wordContext,
          wordId,
          status: "idle",
          onRemove: handleRemoveNode,
        },
      };

      setNodes((nds) => {
        const updated = [...nds, newNode];
        onUsedWordsChange(getUsedWordIds(updated));
        return updated;
      });
    },
    [nodes, screenToFlowPosition, setNodes, onUsedWordsChange, getUsedWordIds, handleRemoveNode]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  // When two handles are connected — show the relation picker
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);
      if (!sourceNode || !targetNode) return;

      // Calculate screen midpoint for picker position
      const sourceEl = document.querySelector(
        `[data-id="${connection.source}"]`
      );
      const targetEl = document.querySelector(
        `[data-id="${connection.target}"]`
      );

      let screenX = window.innerWidth / 2;
      let screenY = window.innerHeight / 2;

      if (sourceEl && targetEl) {
        const sr = sourceEl.getBoundingClientRect();
        const tr = targetEl.getBoundingClientRect();
        screenX = (sr.left + sr.right + tr.left + tr.right) / 4;
        screenY = (sr.top + sr.bottom + tr.top + tr.bottom) / 4;
      }

      setPendingConnection({
        source: connection.source,
        target: connection.target,
        sourceWord: sourceNode.data.wordId as string,
        targetWord: targetNode.data.wordId as string,
        screenPos: { x: screenX, y: screenY },
      });
    },
    [nodes]
  );

  function triggerShake(edgeId: string) {
    setTimeout(() => {
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));
    }, 600);
  }

  function handleRelationSelect(relation: Relation) {
    if (!pendingConnection) return;

    const { source, target, sourceWord, targetWord } = pendingConnection;
    const isCorrect = validateConnection(sourceWord, targetWord, relation, correctPairs);

    const rel = relations.find((r) => r.value === relation)!;
    const edgeId = `edge-${source}-${target}-${Date.now()}`;

    if (isCorrect) {
      // Add green confirmed edge
      const newEdge: Edge = {
        id: edgeId,
        source,
        target,
        type: "relation",
        data: {
          label: rel.label,
          color: rel.color,
          shaking: false,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));

      // Update node statuses to "correct"
      setNodes((nds) =>
        nds.map((n) =>
          n.id === source || n.id === target
            ? { ...n, data: { ...n.data, status: "correct" } }
            : n
        )
      );
    } else {
      // Add wrong edge briefly, then shake + remove
      const wrongEdge: Edge = {
        id: edgeId,
        source,
        target,
        type: "relation",
        data: {
          label: rel.label,
          color: WRONG_EDGE_COLOR,
          shaking: true,
        },
      };
      setEdges((eds) => addEdge(wrongEdge, eds));
      triggerShake(edgeId);
    }

    setPendingConnection(null);
  }

  function handlePickerCancel() {
    setPendingConnection(null);
  }

  const scoreCorrect = edges.filter((e) => e.data?.color !== WRONG_EDGE_COLOR).length;

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Score bar */}
      <div className="px-5 py-2.5 bg-surface-card border-b border-border-subtle flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-success" />
          <span className="text-xs font-bold text-slate-600">
            {scoreCorrect} correct verbonden
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
          <span className="text-xs text-slate-400">
            {nodes.length} woorden op canvas
          </span>
        </div>
        {nodes.length === 0 && (
          <span className="text-xs text-accent-info font-bold ml-auto">
            Sleep hier je eerste woord naar het veld
          </span>
        )}
      </div>

      {/* React Flow canvas */}
      <div
        ref={reactFlowWrapper}
        className="flex-1"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{ hideAttribution: true }}
          deleteKeyCode={null}
          connectionLineStyle={{ stroke: CONNECT_COLOR, strokeWidth: 2 }}
          connectionLineType={ConnectionLineType.Straight}
          snapToGrid
          snapGrid={[16, 16]}
        >
          <Background color="#E2E8F0" gap={24} size={1.5} />
          <Controls showInteractive={false} />

          {/* Empty state overlay */}
          <AnimatePresence>
            {nodes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <Network className="h-16 w-16 text-accent-info/35" strokeWidth={1.5} aria-hidden />
                  </div>
                  <p className="font-black text-slate-300 text-xl">
                    Jouw conceptkaart
                  </p>
                  <p className="text-slate-300 text-sm mt-1">
                    Sleep twee woorden hierheen om te starten
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ReactFlow>
      </div>

      {/* Relation picker portal */}
      {pendingConnection && (
        <RelationPicker
          position={pendingConnection.screenPos}
          onSelect={handleRelationSelect}
          onCancel={handlePickerCancel}
        />
      )}
    </div>
  );
}

// Wrap in provider so useReactFlow works
export default function SemanticCanvas({
  onUsedWordsChange,
  correctPairs,
}: {
  onUsedWordsChange: (ids: Set<string>) => void;
  correctPairs: CorrectPair[];
}) {
  return (
    <ReactFlowProvider>
      <CanvasInner onUsedWordsChange={onUsedWordsChange} correctPairs={correctPairs} />
    </ReactFlowProvider>
  );
}
