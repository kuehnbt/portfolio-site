---
title: "Automated Game CI/CD Pipeline"
date: 2024-07-15
draft: false
summary: "End-to-end automated pipeline for Unity game builds with Steam deployment and multiplayer server orchestration."
category: "devops"
image: "/images/devops-placeholder.jpg"
documented: true
repository: true
wip: false
---

## Overview

Built a comprehensive CI/CD pipeline that reduced game deployment time from 8 hours to 45 minutes while ensuring zero-downtime updates for live multiplayer servers.

## The Challenge

A growing indie studio was struggling with manual deployment processes:
- 8+ hour deployment cycles
- Frequent human errors during releases
- No rollback capabilities
- Server downtime affecting player experience

## Solution Architecture

Designed and implemented a GitLab CI/CD pipeline with:

### Build Automation
```yaml
stages:
  - test
  - build
  - deploy-staging
  - deploy-production

unity-tests:
  stage: test
  script:
    - Unity -batchmode -runTests -testPlatform playmode
    - Unity -batchmode -runTests -testPlatform editmode
```

### Multi-Platform Builds
- Parallel builds for Windows, Mac, Linux
- Automated Steam SDK integration
- Version tagging and changelog generation

### Server Orchestration
- Blue-green deployments for game servers
- Automated health checks before traffic switching
- Rollback capabilities within 30 seconds

## Tech Stack

- **CI/CD**: GitLab CI with custom runners
- **Containerization**: Docker for build environments
- **Orchestration**: Kubernetes for game servers
- **Cloud**: AWS with multi-region deployment
- **Monitoring**: Datadog for build and deployment metrics

## Key Features

### 1. Automated Testing
- Unit tests for game logic
- Integration tests for multiplayer features
- Performance benchmarks to catch regressions

### 2. Smart Caching
- Unity Library folder caching
- Docker layer caching
- Artifact caching between stages

### 3. Progressive Deployment
- Canary releases to 5% of players
- Automatic rollback on error rate spikes
- A/B testing integration

## Results

- **Deployment time**: 8 hours → 45 minutes (94% reduction)
- **Deployment frequency**: Weekly → Daily
- **Failed deployments**: 15% → 0.5%
- **Player-reported bugs**: Decreased by 60%

## Code Sample

Here's a simplified version of the deployment script:

```bash
#!/bin/bash
# Blue-green deployment for game servers

CURRENT_COLOR=$(kubectl get service game-server -o jsonpath='{.spec.selector.color}')
NEW_COLOR=$([[ "$CURRENT_COLOR" == "blue" ]] && echo "green" || echo "blue")

# Deploy new version
kubectl set image deployment/game-server-$NEW_COLOR \
  game-server=game-server:$CI_COMMIT_SHA

# Wait for rollout
kubectl rollout status deployment/game-server-$NEW_COLOR

# Run health checks
./scripts/health-check.sh $NEW_COLOR

# Switch traffic
kubectl patch service game-server \
  -p '{"spec":{"selector":{"color":"'$NEW_COLOR'"}}}'
```

## Lessons Learned

1. **Game builds are unique** - Binary artifacts are large, requiring optimized caching strategies
2. **Player experience is paramount** - Zero-downtime deployments are non-negotiable
3. **Monitoring is crucial** - Real-time metrics help catch issues before players notice

## Future Improvements

- Machine learning for optimal deployment timing
- Automated playtesting in CI pipeline
- Integration with game analytics for deployment impact

[View on GitHub](https://github.com/kuehnbt/game-ci-cd-pipeline) (Coming soon)