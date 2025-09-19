# Cursor Enhancer Backend

This is the backend API server for the Cursor Prompt Enhancer extension. It provides prompt enhancement services using OpenAI's GPT-4o-mini model.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

The server will be available at `http://localhost:3000`.

## API Endpoints

### `POST /api/enhance`
Enhances a given prompt for better AI code generation.

**Request:**
```json
{
    "prompt": "create a login form"
}
```

**Response:**
```json
{
    "success": true,
    "enhanced_prompt": "Create a modern, responsive login form component...",
    "original_prompt": "create a login form",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### `GET /health`
Health check endpoint.

**Response:**
```json
{
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Configuration

Set the following environment variables in `.env`:

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (default: production)

## Development

```bash
# Start with auto-reload
npm run dev

# Production start
npm start
```

## Error Handling

The API handles various error scenarios:
- Invalid or missing prompts
- OpenAI API errors (quota, invalid key, etc.)
- Network timeouts
- Server errors

All errors return structured JSON responses with appropriate HTTP status codes.
