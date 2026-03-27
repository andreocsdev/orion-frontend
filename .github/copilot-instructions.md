# Orion Frontend - Instrucoes Sempre Ativas

Estas instrucoes se aplicam a todo trabalho no repositorio.

## Prioridades

1. Preservar comportamento existente e evitar regressao.
2. Fazer mudancas minimas e focadas no pedido.
3. Reutilizar padroes ja presentes antes de introduzir novo padrao.

## Arquitetura de componentes

1. Preferir Server Components para paginas e blocos que apenas buscam dados.
2. Usar use client somente quando necessario para hooks de estado/efeito, handlers de evento ou APIs de navegacao no cliente.
3. Isolar interatividade em componentes client pequenos dentro de \_components quando possivel.
4. Nao importar utilitarios baseados em next/headers em componentes client.

## Convencoes de estrutura

1. Componentes globais compartilhados devem ficar em components.
2. Componentes especificos de uma rota devem ficar em app/<rota>/\_components.
3. Priorizar nomes descritivos e consistentes com o dominio da feature.

## Formularios e validacao

1. Formularios devem usar react-hook-form + zod.
2. Schemas zod devem ficar fora do componente quando possivel.
3. Validacoes cruzadas devem usar refine/superRefine.
4. Erros de servidor devem ser tratados separadamente do schema de validacao local.

## UX e feedback

1. Sempre exibir feedback claro de sucesso e erro apos acoes do usuario.
2. Manter consistencia visual dos estados de erro/sucesso com componentes existentes.
3. Nao remover mensagens de retorno que ja orientam o usuario.

## Estilo e Tailwind

1. Seguir sintaxe Tailwind v4 no codigo novo.
2. Manter consistencia com classes e tokens ja utilizados no projeto.
3. Evitar refatoracao cosmética sem necessidade funcional.

## Integracao com API

1. Preservar contratos de request/response esperados pela API.
2. Manter tipagem consistente nas camadas de fetch e componentes consumidores.
3. Ao mudar contrato, atualizar tipos e chamadas correlatas no mesmo fluxo de alteracao.

## Seguranca

1. Nao expor tokens, segredos ou dados sensiveis em logs ou mensagens de erro.
2. Nao colocar dados sensiveis no cliente sem necessidade.
3. Sanitizar e validar entradas em formularios antes de envio.

## Quando fizer revisao de codigo

1. Priorizar falhas funcionais, regressao, seguranca e quebra de contrato.
2. Informar risco de cada problema encontrado e impacto esperado.
3. Sugerir testes ou verificacoes objetivas para cada ponto critico.
