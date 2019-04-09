import { WorkspaceProject } from '@angular-devkit/core/src/workspace';

export function getProjectTargetConfigurations(project: WorkspaceProject, buildTarget = 'build') {
  if (project.architect && project.architect[buildTarget] && project.architect[buildTarget].options) {
    return project.architect[buildTarget].configurations;
  }

  throw new Error(`Cannot determine project target configurations for: ${buildTarget}.`);
}
