---
description: "Regras para componentes e paginas React/Next no frontend Orion"
applyTo: "app/**/*.tsx,components/**/*.tsx"
---

# Regras de Componentes Frontend

1. Priorizar Server Components para leitura/renderizacao de dados.
2. Use client apenas em componentes que realmente precisam de hooks/handlers.
3. Evitar logica complexa em pagina quando ela puder ser extraida para componentes menores.
4. Garantir tipagem explicita em props e retornos relevantes.
5. Em formulario, usar react-hook-form + zod e feedback de erro claro.
6. Nao alterar estrutura visual ampla sem pedido explicito.
7. Preservar acessibilidade basica (labels, foco, texto legivel, estados de erro).
