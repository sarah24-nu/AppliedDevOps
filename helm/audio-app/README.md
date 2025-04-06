# Audio Application Helm Chart

This Helm chart deploys the Audio Application with its backend and MongoDB database.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `audio-app`:

```bash
helm install audio-app ./audio-app
```

The command deploys the Audio Application on the Kubernetes cluster in the default configuration. The [Parameters](#parameters) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `audio-app` deployment:

```bash
helm uninstall audio-app
```

## Parameters

### Backend Parameters

| Name                | Description                                          | Value           |
|---------------------|------------------------------------------------------|-----------------|
| `backend.enabled`   | Enable backend deployment                            | `true`          |
| `backend.replicaCount` | Number of backend replicas                        | `1`             |
| `backend.image.repository` | Backend image repository                      | `your-registry/audio-app-backend` |
| `backend.image.tag` | Backend image tag                                   | `latest`        |
| `backend.image.pullPolicy` | Backend image pull policy                    | `IfNotPresent`  |
| `backend.service.type` | Backend service type                            | `ClusterIP`     |
| `backend.service.port` | Backend service port                            | `5000`          |
| `backend.env.FLASK_ENV` | Flask environment                              | `production`    |

### MongoDB Parameters

| Name                          | Description                                          | Value           |
|-------------------------------|------------------------------------------------------|-----------------|
| `mongodb.enabled`             | Enable MongoDB deployment                             | `true`          |
| `mongodb.image.repository`    | MongoDB image repository                             | `mongo`         |
| `mongodb.image.tag`           | MongoDB image tag                                    | `4.4`           |
| `mongodb.image.pullPolicy`    | MongoDB image pull policy                            | `IfNotPresent`  |
| `mongodb.auth.database`       | MongoDB database name                                | `audiodb`       |
| `mongodb.auth.rootUsername`   | MongoDB root username                                | `admin`         |
| `mongodb.auth.rootPassword`   | MongoDB root password                                | `changeme`      |
| `mongodb.persistence.size`    | MongoDB persistence size                             | `1Gi`           |
| `mongodb.persistence.storageClass` | MongoDB persistence storage class                | `standard`      |

## Configuration and installation details

### Setting Pod's affinity

This chart allows you to set your custom affinity using the `affinity` parameter. Find more information about Pod's affinity in the [kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity).

### Deploying extra resources

There are cases where you may want to deploy extra objects, such as custom resources, ConfigMaps, or Secrets. For covering this case, the chart allows adding the full specification of other objects using the `extraDeploy` parameter.

## Maintainers

- Sarah (f219402@cfd.nu.edu.pk)
- Abdul Muhiman (f219410@cfd.nu.edu.pk)

## License

Copyright &copy; 2024 Sarah and Abdul Muhiman

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 