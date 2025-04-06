# Audio Application - Kubernetes Deployment

This repository contains the Kubernetes deployment configuration for the Audio Application, including Helm charts, service mesh configuration, and GitOps setup with Argo CD.

## Project Structure

```
.
├── argocd/                    # Argo CD configuration
│   └── audio-app.yaml         # Argo CD Application manifest
├── helm/                      # Helm charts
│   └── audio-app/            # Audio application Helm chart
│       ├── templates/        # Kubernetes manifest templates
│       ├── values.yaml       # Default values
│       ├── values-dev.yaml   # Development environment values
│       └── values-prod.yaml  # Production environment values
├── kustomize/                # Kustomize configuration
│   ├── base/                # Base configuration
│   └── overlays/            # Environment-specific overlays
│       ├── dev/            # Development environment
│       └── prod/           # Production environment
└── service-mesh/            # Service mesh configuration
    ├── virtual-service.yaml    # Istio VirtualService
    └── destination-rule.yaml   # Istio DestinationRule
```

## Prerequisites

- Kubernetes cluster (1.19+)
- Helm 3.2.0+
- Argo CD
- Istio Service Mesh
- kubectl configured to access your cluster

## Installation

### 1. Install Istio Service Mesh

```bash
# Install Istio
istioctl install --set profile=demo -y

# Enable automatic sidecar injection
kubectl label namespace dev istio-injection=enabled
kubectl label namespace prod istio-injection=enabled
```

### 2. Deploy with Helm

```bash
# Development environment
helm install audio-app-dev ./helm/audio-app -f ./helm/audio-app/values-dev.yaml -n dev

# Production environment
helm install audio-app-prod ./helm/audio-app -f ./helm/audio-app/values-prod.yaml -n prod
```

### 3. Deploy with Kustomize

```bash
# Development environment
kubectl apply -k kustomize/overlays/dev

# Production environment
kubectl apply -k kustomize/overlays/prod
```

### 4. Configure Argo CD

```bash
# Apply Argo CD Application manifest
kubectl apply -f argocd/audio-app.yaml
```

## Security Features

1. **RBAC Implementation**
   - Service accounts for each component
   - Role-based access control
   - Least privilege principle

2. **Secrets Management**
   - Kubernetes Secrets for sensitive data
   - Base64 encoded values
   - Separate secrets for each environment

3. **Network Security**
   - Istio mTLS for service-to-service communication
   - Network policies
   - Ingress rules with TLS

4. **Database Security**
   - Persistent volume claims with proper access modes
   - Database credentials stored in secrets
   - StatefulSet deployment for data persistence

## GitOps Workflow

1. **Automated Sync**
   - Argo CD watches the Git repository
   - Automatic deployment on changes
   - Self-healing capabilities

2. **Rollback Strategy**
   - Automatic rollback on failed deployments
   - Manual rollback through Argo CD UI
   - Version tracking and history

3. **Environment Management**
   - Separate configurations for dev/prod
   - Environment-specific resource limits
   - Automated namespace creation

## Service Mesh Features

1. **Traffic Management**
   - Canary deployments (90/10 split)
   - Circuit breaking
   - Retry policies

2. **Security**
   - mTLS encryption
   - Authorization policies
   - Traffic encryption

3. **Observability**
   - Distributed tracing
   - Metrics collection
   - Service dashboards

## Maintenance

### Updating the Application

1. Update the Helm chart values
2. Commit changes to Git
3. Argo CD automatically syncs the changes

### Scaling

```bash
# Scale backend deployment
kubectl scale deployment audio-app-backend --replicas=3 -n dev

# Scale production
kubectl scale deployment audio-app-backend --replicas=5 -n prod
```

### Monitoring

- Access Istio Kiali dashboard for service mesh visualization
- Use Argo CD UI for deployment status
- Monitor application logs using kubectl logs

## Troubleshooting

1. **Pod Issues**
   ```bash
   kubectl describe pod <pod-name> -n <namespace>
   kubectl logs <pod-name> -n <namespace>
   ```

2. **Service Mesh Issues**
   ```bash
   istioctl analyze
   istioctl proxy-config cluster <pod-name>.<namespace>
   ```

3. **Argo CD Sync Issues**
   ```bash
   argocd app get audio-app
   argocd app logs audio-app
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.