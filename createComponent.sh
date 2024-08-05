#!/bin/bash

# Проверяем, что имя компонента передано
if [ -z "$1" ]; then
  echo "Usage: createComponent ComponentName"
  exit 1
fi

COMPONENT_NAME=$1
COMPONENT_DIR="Мы 11 Да 8 Май/$COMPONENT_NAME"

# Создаем папки
mkdir -p "$COMPONENT_DIR/__tests__"
mkdir -p "$COMPONENT_DIR/components"
mkdir -p "$COMPONENT_DIR/contexts"
mkdir -p "$COMPONENT_DIR/draw"
mkdir -p "$COMPONENT_DIR/hooks"
mkdir -p "$COMPONENT_DIR/services"
mkdir -p "$COMPONENT_DIR/styles"

# Создаем файлы и добавляем шаблоны
cat <<EOL > "$COMPONENT_DIR/${COMPONENT_NAME}Page.jsx"
import React from 'react';

export default function ${COMPONENT_NAME}Page() {
  return (
    <div>
      <h1>${COMPONENT_NAME} Page</h1>
    </div>
  );
};
EOL

cat <<EOL > "$COMPONENT_DIR/__tests__/$COMPONENT_NAME.test.jsx"
import React from 'react';
import { render } from '@testing-library/react';
import ${COMPONENT_NAME} from '../components/${COMPONENT_NAME}';

});
EOL

cat <<EOL > "$COMPONENT_DIR/contexts/Context.js"
// Context setup for ${COMPONENT_NAME} component
import React, { createContext, useContext, useState } from 'react';

const ${COMPONENT_NAME}Context = createContext();

export const ${COMPONENT_NAME}Provider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <${COMPONENT_NAME}Context.Provider value={{ state, setState }}>
      {children}
    </${COMPONENT_NAME}Context.Provider>
  );
};

export const use${COMPONENT_NAME} = () => useContext(${COMPONENT_NAME}Context);
EOL

cat <<EOL > "$COMPONENT_DIR/hooks/useCustomHooks.js"
// Custom hooks for ${COMPONENT_NAME} component
import { useState, useEffect, useCallback } from 'react';

};
EOL

cat <<EOL > "$COMPONENT_DIR/services/apiService.js"
// API service functions
export const fetchData = async () => {
};
EOL

cat <<EOL > "$COMPONENT_DIR/services/authService.js"
// Authentication service functions
export const authenticateUser = async (credentials) => {
};
EOL

cat <<EOL > "$COMPONENT_DIR/styles/${COMPONENT_NAME}.css"
/* Styles for ${COMPONENT_NAME} component */
.${COMPONENT_NAME} {
  background-color: #0e57df;
}
EOL

cat <<EOL > "$COMPONENT_DIR/constants.js"
// Constants for ${COMPONENT_NAME} component
EOL

cat <<EOL > "$COMPONENT_DIR/utils.js"
// Utility functions for ${COMPONENT_NAME} component
EOL

echo "Component '$COMPONENT_NAME' created successfully with templates."
