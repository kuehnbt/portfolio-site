---
title: "Multiplayer FPS Prototype"
date: 2024-08-01
draft: false
summary: "Fast-paced multiplayer FPS built in Unreal Engine 5 with custom netcode optimizations for low-latency gameplay."
category: "gamedev"
image: "/images/gamedev-placeholder.jpg"
documented: true
repository: false
downloadable: true
wip: true
---

## Overview

A multiplayer first-person shooter prototype featuring fast-paced arena combat, built to learn Unreal Engine 5 and explore network optimization techniques from my DevOps background.

## Key Features

### Gameplay Mechanics
- **Movement System**: Inspired by Quake/Titanfall with wall-running and double jumps
- **Weapon Arsenal**: 5 unique weapons with distinct playstyles
- **Game Modes**: Deathmatch, Team Deathmatch, and Capture the Flag
- **Map Design**: 3 arena maps optimized for 8-16 players

### Technical Implementation

#### Custom Network Optimizations
Drawing from my infrastructure experience, I implemented several netcode improvements:

```cpp
// Priority-based network updates
void APlayerCharacter::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
    Super::GetLifetimeReplicatedProps(OutLifetimeProps);
    
    // High priority for player position/rotation
    DOREPLIFETIME_CONDITION(APlayerCharacter, PlayerLocation, COND_SkipOwner);
    DOREPLIFETIME_CONDITION(APlayerCharacter, AimRotation, COND_SkipOwner);
    
    // Lower priority for cosmetic properties
    DOREPLIFETIME_CONDITION(APlayerCharacter, CharacterCustomization, COND_Custom);
}
```

#### Lag Compensation System
- Client-side prediction with server reconciliation
- Interpolation for smooth movement on high-latency connections
- Hit validation with rewind system

### Performance Metrics

- **Network Usage**: 15KB/s per player (industry standard: 20-30KB/s)
- **Tick Rate**: 60Hz server, 120Hz client
- **Latency Tolerance**: Playable up to 150ms ping
- **Player Count**: Tested with 16 concurrent players

## Development Process

### Week 1-2: Core Mechanics
- Implemented character movement and shooting mechanics
- Set up basic multiplayer framework

### Week 3-4: Network Optimization
- Applied DevOps monitoring principles to identify bottlenecks
- Implemented custom replication system
- Added client-side prediction

### Week 5-6: Polish and Testing
- Created UI/UX for server browser and matchmaking
- Conducted playtests with online community
- Performance profiling and optimization

## Technologies Used

- **Engine**: Unreal Engine 5.3
- **Networking**: Custom C++ netcode on top of UE5
- **Backend**: Dedicated servers on AWS GameLift
- **Monitoring**: Custom telemetry inspired by DevOps practices

## Lessons Learned

1. **Network architecture matters**: My DevOps background helped optimize packet flow
2. **Playtesting is crucial**: Real player feedback shaped the final gameplay
3. **Performance first**: 60FPS is non-negotiable for competitive shooters

## What's Next

- Implementing rollback netcode for fighting game-like responsiveness
- Adding ranked matchmaking system
- Exploring procedural map generation

## Screenshots

*(Coming soon - gameplay footage and network graphs)*

[Download Playable Build](https://gamedev.kuehn.io/fps-prototype) (Coming soon)