import { useEffect } from 'react';
import { useStore } from '../../store';
import { FiCheckCircle, FiX, FiActivity, FiGitBranch, FiShare2 } from 'react-icons/fi';
import { Card, CardHeader, CardBody } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { StatCard } from './StatCard';

export const AlertPopup = () => {
  const { alert, hideAlert } = useStore(state => ({
    alert: state.alert,
    hideAlert: state.hideAlert
  }));

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [alert.show, hideAlert]);

  if (!alert.show) return null;

  const getIcon = () => {
    switch (alert.type) {
      case 'success':
        return <FiCheckCircle className="w-6 h-6 text-success-600" />;
      case 'error':
        return <FiX className="w-6 h-6 text-error-600" />;
      default:
        return <FiCheckCircle className="w-6 h-6 text-primary-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (alert.type) {
      case 'success':
        return 'bg-indigo-50 border-indigo-200';
      case 'error':
        return 'bg-error-50 border-error-200';
      default:
        return 'bg-primary-50 border-primary-200';
    }
  };

  const getTextColor = () => {
    switch (alert.type) {
      case 'success':
        return 'text-indigo-800';
      case 'error':
        return 'text-error-800';
      default:
        return 'text-primary-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <Card 
        variant="modal" 
        className={`max-w-md w-full mx-4 transform transition-all duration-300 ease-out animate-slide-in ${getBackgroundColor()}`}
      >
        <CardHeader variant="modal" className='bg-indigo-100'>
          <div className="flex items-center gap-3">
            {getIcon()}
            <h3 className={`text-lg font-semibold ${getTextColor()}`}>
              {alert.title || 'Pipeline Analysis Complete'}
            </h3>
          </div>
          <Button
            onClick={hideAlert}
            variant="icon"
            icon={FiX}
          />
        </CardHeader>

        <CardBody>
          {alert.message && (
            <p className="text-gray-700 mb-4 leading-relaxed">
              {alert.message}
            </p>
          )}

          {alert.data && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Pipeline Analysis Results:</h4>
              
              <div className="grid grid-cols-1 gap-3">
                <StatCard
                  icon={FiActivity}
                  iconVariant="primary"
                  title="Total Nodes"
                  subtitle="Processing units in pipeline"
                  value={alert.data.num_nodes}
                  valueColor="text-primary-600"
                />

                <StatCard
                  icon={FiShare2}
                  iconVariant="secondary"
                  title="Total Connections"
                  subtitle="Links between nodes"
                  value={alert.data.num_edges}
                  valueColor="text-secondary-600"
                />

                <StatCard
                  icon={FiGitBranch}
                  iconVariant={alert.data.is_dag ? 'success' : 'error'}
                  title="Pipeline Structure"
                  subtitle={alert.data.is_dag ? 'Valid directed acyclic graph' : 'Contains cycles or invalid structure'}
                >
                  <Badge
                    variant={alert.data.is_dag ? 'success' : 'error'}
                    size="sm"
                  >
                    {alert.data.is_dag ? '✓ Valid DAG' : '⚠ Invalid DAG'}
                  </Badge>
                </StatCard>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Summary:</span> Your pipeline contains{' '}
                  <span className="font-semibold text-primary-600">{alert.data.num_nodes} nodes</span> connected by{' '}
                  <span className="font-semibold text-secondary-600">{alert.data.num_edges} edges</span>, and is{' '}
                  <span className={`font-semibold ${alert.data.is_dag ? 'text-success-600' : 'text-warning-600'}`}>
                    {alert.data.is_dag ? 'structurally valid' : 'structurally invalid'}
                  </span>.
                </p>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
