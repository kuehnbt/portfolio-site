---
title: "Procedural Roguelike - Godot Engine"
date: 2024-07-25
draft: false
summary: "A procedurally generated roguelike with persistent progression, built in Godot 4.0 with GDScript."
category: "gamedev"
documented: true
repository: true
downloadable: false
wip: true
---

## Overview

A 2D roguelike game featuring procedural dungeon generation, permadeath mechanics, and meta-progression systems. Built as a learning project to explore game design patterns and Godot's capabilities.

## Core Features

### Procedural Generation System
The dungeon generation uses a combination of BSP (Binary Space Partitioning) and cellular automata:

```gdscript
# Simplified dungeon generation algorithm
func generate_dungeon(width: int, height: int) -> Array:
    var rooms = []
    var tree = BSPNode.new(Rect2(0, 0, width, height))
    
    # Recursively split space
    _split_bsp(tree, MIN_ROOM_SIZE)
    
    # Create rooms in leaf nodes
    for leaf in tree.get_leaves():
        var room = _create_room(leaf.bounds)
        rooms.append(room)
    
    # Connect rooms with corridors
    _connect_rooms(rooms)
    
    # Apply cellular automata for organic feel
    _smooth_walls()
    
    return rooms
```

### Combat System
- **Tactical Turn-Based**: Every action matters
- **Ability Synergies**: 20+ abilities that combo together
- **Enemy AI**: State machines with personality types

### Meta-Progression
Inspired by Hades and Dead Cells:
- Unlock new starting abilities
- Permanent stat upgrades
- New dungeon biomes and enemy types

## Technical Highlights

### Performance Optimizations
Applied infrastructure knowledge to game systems:

```gdscript
# Object pooling for projectiles and effects
class_name ObjectPool extends Node

var _available_objects = []
var _active_objects = []

func get_object():
    if _available_objects.is_empty():
        return _create_new_object()
    
    var obj = _available_objects.pop_back()
    _active_objects.append(obj)
    obj.reset()
    obj.set_visible(true)
    return obj

func return_object(obj):
    _active_objects.erase(obj)
    _available_objects.append(obj)
    obj.set_visible(false)
```

### Save System
Leveraging data management experience:
- Efficient binary save files
- Save state compression
- Cloud save integration ready

## Development Timeline

### Month 1: Foundation
- Core movement and combat
- Basic dungeon generation
- Initial enemy types

### Month 2: Systems
- Ability system with 20+ unique abilities
- Item generation and balancing
- Advanced enemy AI

### Month 3: Polish
- Particle effects and game juice
- UI/UX improvements
- Performance optimization

## Art Style

Chose a minimalist pixel art style to focus on mechanics:
- 16x16 tile size for clarity
- Limited color palette (32 colors)
- Procedural decoration system

## Playtesting Insights

Conducted weekly playtests with 50+ testers:
- **Difficulty curve**: Adjusted based on completion rates
- **Ability balance**: Data-driven approach to balancing
- **Tutorial**: Added contextual hints based on confusion points

## Technologies

- **Engine**: Godot 4.0
- **Language**: GDScript
- **Version Control**: Git with LFS for assets
- **Analytics**: Custom telemetry system
- **CI/CD**: Automated builds for multiple platforms

## Current Status

The game is in active development with:
- 3 complete dungeon biomes
- 50+ unique enemies
- 100+ items and abilities
- 2-3 hours of content per run

## Future Plans

- Steam release with achievements
- Daily challenge mode with leaderboards
- Mod support through Godot's resource system

[View on GitHub](https://github.com/kuehnbt/godot-roguelike) | [Follow Development](https://gamedev.kuehn.io/devlog)