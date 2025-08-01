---
title: "VR Meditation Garden"
date: 2024-08-10
draft: false
summary: "A calming VR experience built in Unity featuring procedural landscapes and biometric-driven environments."
category: "gamedev"
image: "/images/gamedev-placeholder.jpg"
documented: true
repository: false
downloadable: false
wip: true
---

## Overview

An experimental VR meditation experience that adapts to the user's stress levels through biometric data. The environment dynamically changes based on heart rate variability, creating a personalized relaxation journey.

## Concept & Design

### Core Experience
- **Dynamic Environments**: Landscapes that breathe with you
- **Biometric Integration**: Heart rate drives environmental changes
- **Spatial Audio**: 3D soundscapes for deep immersion
- **Gesture Controls**: Natural hand movements for interaction

### Technical Innovation

#### Biometric Feedback Loop
```csharp
public class BiometricEnvironmentController : MonoBehaviour
{
    private float currentHeartRate;
    private float targetCalmness;
    
    void UpdateEnvironment()
    {
        // Map heart rate to environmental parameters
        float stress = MapHeartRateToStress(currentHeartRate);
        
        // Smooth transitions
        targetCalmness = Mathf.Lerp(targetCalmness, 1f - stress, Time.deltaTime * 0.5f);
        
        // Apply to environment
        skyController.SetTimeOfDay(targetCalmness);
        weatherSystem.SetIntensity(1f - targetCalmness);
        audioManager.CrossfadeTo(targetCalmness > 0.7f ? "calm" : "active");
    }
}
```

## Features Implemented

### Environmental Systems
- **Procedural Terrain**: Infinite landscapes using noise functions
- **Weather System**: Rain, fog, and wind that respond to user state
- **Day/Night Cycle**: Tied to relaxation progress
- **Particle Effects**: Fireflies, leaves, and ambient particles

### VR Optimization
Applied performance knowledge from DevOps:
- **Foveated Rendering**: 40% GPU savings
- **LOD System**: Dynamic detail based on view distance
- **Occlusion Culling**: Smart visibility checks
- **90 FPS Target**: Consistent performance on Quest 2

### Interaction Design
- **Hand Tracking**: Natural gestures for meditation poses
- **Haptic Feedback**: Subtle vibrations for breathing cues
- **Comfort Options**: Teleportation and smooth locomotion

## Development Process

### Research Phase (Week 1-2)
- Studied meditation apps and VR comfort best practices
- Interviewed meditation practitioners
- Researched biometric integration options

### Prototyping (Week 3-4)
- Built core VR interaction system
- Implemented basic environment generation
- Created initial audio system

### Integration (Week 5-6)
- Added Bluetooth heart rate monitor support
- Refined environmental responses
- Implemented multiple meditation scenarios

## Technical Stack

- **Engine**: Unity 2022.3 LTS
- **VR SDK**: OpenXR with XR Interaction Toolkit
- **Target Platforms**: Meta Quest 2, PCVR (SteamVR)
- **Biometrics**: Polar H10 integration via BLE
- **Audio**: FMOD for adaptive soundscapes

## User Testing Results

Tested with 20 participants over 2 weeks:
- **Average Session**: 15 minutes (target was 10)
- **Stress Reduction**: 32% decrease in reported stress
- **Motion Sickness**: 0% reported (comfort-first design)
- **Return Rate**: 80% used app multiple times

## Challenges & Solutions

### Challenge: Biometric Latency
**Problem**: Heart rate data had 2-3 second delay
**Solution**: Predictive algorithm based on breathing patterns

### Challenge: VR Comfort
**Problem**: Some users felt overwhelmed by environmental changes
**Solution**: Added intensity slider and preset modes

## Future Development

- **More Biometrics**: EEG and breathing sensors
- **Multiplayer**: Shared meditation spaces
- **AI Coach**: Personalized guidance based on patterns
- **Mobile AR**: Companion app for quick sessions

## Impact

This project bridges my technical background with creative game development:
- Applied system monitoring to human monitoring
- Used performance optimization for VR requirements
- Leveraged data analysis for user experience

## Gallery

*(VR screenshots and biometric visualization coming soon)*