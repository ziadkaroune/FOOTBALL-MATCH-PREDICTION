#!/bin/bash

set -e

cleanup() {
  echo ""
  echo "Stopping frontend & backend..."
  kill -- -$$ 2>/dev/null
  exit 0
}

trap cleanup INT TERM EXIT

echo "run front end"
cd frontend
npm run dev &
cd ..

echo "run backend"
cd backend
dotnet run &
cd ..

wait
