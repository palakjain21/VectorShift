import { PipelineToolbar } from './components/ui_components/Toolbar';
import { PipelineUI } from './components/ui_components/UI';
import { AlertPopup } from './components/common_components/AlertPopup';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <AlertPopup />
    </div>
  );
}

export default App;
