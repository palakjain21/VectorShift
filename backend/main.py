from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        # Parse the pipeline JSON
        pipeline_data = json.loads(pipeline)
        
        # Extract nodes and edges
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        # Count nodes and edges
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Simple DAG validation - check for cycles
        # Build adjacency list
        graph = {}
        for node in nodes:
            graph[node['id']] = []
        
        for edge in edges:
            if edge['source'] in graph:
                graph[edge['source']].append(edge['target'])
        
        # Check if it's a DAG using DFS
        def has_cycle():
            visited = set()
            rec_stack = set()
            
            def dfs(node):
                if node in rec_stack:
                    return True
                if node in visited:
                    return False
                
                visited.add(node)
                rec_stack.add(node)
                
                for neighbor in graph.get(node, []):
                    if dfs(neighbor):
                        return True
                
                rec_stack.remove(node)
                return False
            
            for node in graph:
                if node not in visited:
                    if dfs(node):
                        return True
            return False
        
        is_dag = not has_cycle()
        
        return {
            'status': 'parsed',
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': str(e),
            'num_nodes': 0,
            'num_edges': 0,
            'is_dag': False
        }
