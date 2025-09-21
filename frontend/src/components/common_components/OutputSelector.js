import { Button } from './Button';

export const OutputSelector = ({ selectedNode, onOutputSelect, onBackToNodes }) => {
  const selectedNodeOutputs = selectedNode?.outputs || [];

  return (
    <>
      <div className="p-3 text-xs font-medium text-primary-800 border-b border-gray-200 bg-primary-100 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Button
            onClick={onBackToNodes}
            variant="small"
          >
            ←
          </Button>
          Select Output
        </div>
      </div>
      {selectedNodeOutputs.map((output) => (
        <div
          key={output.id}
          className="px-2 py-2 hover:bg-indigo-50 cursor-pointer border-b border-primary-100 last:border-b-0 flex items-center gap-3"
          onClick={() => onOutputSelect(output)}
        >
          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-primary-800">🔗</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {output.id}
            </div>
            <div className="text-xs text-gray-500">
              Output field
            </div>
          </div>
          <div className="text-xs text-primary-800 font-mono bg-primary-100 px-2 py-1 rounded">
            {output.type || 'source'}
          </div>
        </div>
      ))}
    </>
  );
};
