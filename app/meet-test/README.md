# Meet-Test Route

This route provides a full-screen AI meeting room interface using a custom compound structure that integrates voice-to-voice conversation capabilities from `@test2` components with a professional meeting UI.

## Features

### AI Meeting Room
- **Full-Screen Interface**: Takes up the entire screen for immersive meeting experience
- **Video Grid Layout**: Two-panel layout showing user video and AI assistant
- **Media Controls**: Toggle video/audio with visual indicators and proper button functionality
- **Voice-to-Voice Chat**: Real-time voice conversation with AI using Web Speech API, with AssemblyAI fallback
- **Voice Activity Detection**: Real-time voice activity indicators for both user and AI
- **Custom Compound**: Uses dedicated `@meet-test` compound components
- **Chat Integration**: Integrated chat panel for text-based communication
- **Voice Settings**: Configurable voice, rate, pitch, and auto-listen options

## Components

### Core Files
- `layout.tsx`: Simple layout wrapper for full-screen experience
- `page.tsx`: Main page using the MeetTestRoom component

### Meet-Test Compound (`@components/meet-test/`)
- **Core**: `MeetTestRoom` - Main meeting room component
- **UI**: `MeetTestHeader`, `MeetTestControls` - Interface components
- **Voice**: `VoiceChat`, `VoiceSettings` - Voice conversation components

### Key Features
1. **Full-Screen Experience**: Immersive meeting interface that covers the entire screen
2. **Video Controls**: Working video on/off toggle with proper visual feedback
3. **Audio Controls**: Microphone mute/unmute functionality
4. **Voice-to-Voice AI**: Real-time speech recognition and text-to-speech
5. **Voice Settings**: Customizable voice parameters and auto-listen functionality
6. **Real-time Communication**: Live voice activity detection
7. **Media Stream Management**: Handles camera and microphone access with proper cleanup
8. **No VAPI Dependency**: Uses own voice components instead of external AI services

## Usage

Navigate to `/meet-test` to access the AI meeting room:

- **Video Toggle**: Click the video button to turn camera on/off
- **Audio Toggle**: Click the microphone button to mute/unmute
- **Voice Chat**: Click "Start Voice Chat" to begin voice conversation with AI
- **Voice Settings**: Click settings to configure voice parameters
- **Chat Panel**: Use the chat for text-based communication
- **Voice Activity**: See real-time indicators when speaking

## Dependencies

- Uses custom `@meet-test` compound components
- Integrates voice components from `@test2` functionality
- Uses Web Speech API for speech recognition and synthesis
- Falls back to AssemblyAI for speech recognition when Web Speech API fails
- Handles media streams for camera and microphone access
- Uses OpenAI API for AI responses

## Browser Compatibility

**⚠️ Browser Restricted Access**

This AI meeting room is **only compatible** with the following browsers for optimal voice-to-voice functionality:

- ✅ **Google Chrome** (recommended) - Full Web Speech API support
- ✅ **Microsoft Edge** - Full Web Speech API support

**❌ Explicitly Blocked:**
- Firefox
- Safari
- Brave (not supported despite being Chrome-based)
- Other browsers

Users attempting to access with unsupported browsers will see a clear restriction message with download links for supported browsers. This ensures consistent voice conversation quality and Web Speech API reliability across all sessions.
