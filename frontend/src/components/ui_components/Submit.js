import { useStore } from '../../store';
import { Button } from '../common_components/Button';
import { useCallback } from 'react';
import { baseURL, pipelineURL } from '../../constants/constants';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const showAlert = useStore((state) => state.showAlert);

    const hasNodes = nodes.length > 0;

    const handleSubmit = useCallback(async () => {
        if (!hasNodes) return;
        try {
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    name: node.type || node.data?.type || 'Unknown',
                    position: node.position,
                    properties: {
                        ...node.data,
                        type: node.type
                    }
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                }))
            };

            const response = await fetch(`${pipelineURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    pipeline: JSON.stringify(pipelineData)
                })
            });

            if (response.ok) {
                const result = await response.json();
                
                showAlert(
                    'success',
                    'Pipeline Analysis Complete',
                    'Your pipeline has been successfully analyzed and processed.',
                    {
                        num_nodes: result.num_nodes,
                        num_edges: result.num_edges,
                        is_dag: result.is_dag
                    }
                );
            } else {
                console.error('Failed to submit pipeline:', response.statusText);
                showAlert(
                    'error',
                    'Pipeline Submission Failed',
                    `Failed to submit pipeline: ${response.statusText}. Please check your pipeline configuration and try again.`
                );
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            showAlert(
                'error',
                'Connection Error',
                'Unable to connect to the server. Please check your internet connection and try again.'
            );
        }
    }, [hasNodes, nodes, edges, showAlert]);


    return (
        <div className="flex items-center justify-center">
            <Button 
                type="button" 
                onClick={handleSubmit}
                variant="success"
                size="md"
                disabled={!hasNodes}
                title={!hasNodes ? "Add nodes to the canvas to enable submit" : "Submit pipeline (Enter+S)"}
            >
                Submit
            </Button>
        </div>
    );
}
