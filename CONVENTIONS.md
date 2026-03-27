# Convenções e Boas Práticas — Orion Frontend

---

## 1. Server Components vs Client Components

### Regra geral
- **Páginas que apenas buscam dados** devem ser `async` Server Components — **nunca** adicionar `"use client"`.
- **`"use client"`** só é necessário quando o componente usa hooks (`useState`, `useEffect`, `usePathname`, etc.) ou handlers de eventos.

```tsx
// ✅ Correto — Server Component com fetch
export default async function RankingPage() {
  const res = await getRanking();
  const entries = res.status === 200 ? res.data : [];
  return <RankList entries={entries} />;
}

// ❌ Errado — client component desnecessário para buscar dados
"use client";
export default function RankingPage() {
  const [entries, setEntries] = useState([]);
  useEffect(() => { getRanking().then(...) }, []);
  ...
}
```

### `next/headers` nunca pode ser importado em Client Components
Se uma função utilitária usa `cookies()` ou `headers()` de `next/headers`, ela **não pode ser importada** por um componente marcado com `"use client"`. O fetch da API (`app/_lib/fetch.ts`) usa `next/headers`, logo só pode ser chamado no servidor.

---

## 2. Componentização

### Isolar interatividade no menor componente possível
Quando uma página é Server Component mas precisa de interação pontual (ex: fallback de imagem com `onError`, toggle de estado), extraia **apenas essa parte** para um Client Component separado.

```tsx
// app/ranking/_components/rank-avatar.tsx
"use client";
export function RankAvatar({ name, image }: Props) {
  const [imgError, setImgError] = useState(false);
  ...
}

// app/ranking/page.tsx  ← permanece Server Component
import { RankAvatar } from "./_components/rank-avatar";
```

### Estrutura de pastas por feature
```
app/
  ranking/
    page.tsx               ← Server Component
    _components/
      rank-avatar.tsx      ← Client Component isolado
      rank-card.tsx
```

### Reutilização global
Componentes usados em múltiplas rotas vivem em `/components`. Componentes exclusivos de uma rota ficam em `_components/` dentro dessa rota.

---

## 3. Formulários — react-hook-form + zod

Sempre usar `react-hook-form` com `zod` para validação. Nunca validar formulários manualmente.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  ...
}
```

- Schemas de login e registro devem ser declarados **fora** do componente.
- Use `.refine()` para validações cruzadas (ex: confirmação de senha).
- Erros de servidor devem ser exibidos em um estado separado (`serverError`), não dentro do schema.

---

## 4. Feedback de UX

- Sempre exibir feedback após ações (sucesso e erro) em cards estilizados com ícones `lucide-react`.
- Sucesso: verde + `CheckCircle2`.
- Erro: vermelho + `AlertCircle`.
- Após sucesso em registro, resetar o form e redirecionar para o tab de login.

```tsx
{successMessage && (
  <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
    <CheckCircle2 className="size-4 shrink-0" />
    {successMessage}
  </div>
)}
```

---

## 5. Imagens de usuários externos

- Sempre adicionar `onError` para fallback de imagens de perfil.
- Registrar domínios externos em `next.config.ts` via `remotePatterns`.

```ts
// next.config.ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "lh3.googleusercontent.com" },
  ],
},
```

- O fallback padrão é um div com as iniciais do nome do usuário.

---

## 6. Tailwind CSS v4

Usar a sintaxe atualizada do Tailwind v4:

| ❌ v3 (antigo)       | ✅ v4 (correto)         |
|----------------------|-------------------------|
| `flex-shrink-0`      | `shrink-0`              |
| `bg-gradient-to-r`   | `bg-linear-to-r`        |
| `flex-grow`          | `grow`                  |
| `overflow-ellipsis`  | `text-ellipsis`         |

---

## 7. Layout e Navegação

### AppShell
O componente `AppShell` controla a exibição da `BottomNav` e o padding inferior (`pb-20`) com base na rota atual. Rotas de autenticação (`/auth/*`) não exibem a barra de navegação.

```tsx
const isAuthRoute = pathname.startsWith("/auth");
```

### Layout específico por seção
Rotas com layout diferente (ex: `/auth`) devem ter um `layout.tsx` próprio na pasta da rota.

### Fundo branco forçado
Para evitar fundo escuro em qualquer contexto, garantir `bg-white` em `html`, `body` e `main`, e reforçar no `globals.css`:

```css
@layer base {
  html, body { background: #fff; }
}
```

---

## 8. Tipagem da API

O arquivo `app/_lib/api/fetch-generated/index.ts` é mantido **manualmente** e deve ser atualizado sempre que o schema de resposta da API mudar. Ele centraliza todos os tipos e funções de fetch.

- Adicionar novos endpoints no final do arquivo na seção correspondente.
- Nomear os tipos de forma consistente: `getXxxResponse200`, `getXxxResponseSuccess`, `getXxxResponse`, `getXxxUrl`, `getXxx`.

---

## 9. Placeholders em formulários

Não repetir o texto do label no placeholder. Usar exemplos de formato:

| Campo            | Label       | Placeholder           |
|------------------|-------------|-----------------------|
| Email            | Email        | `nome@dominio.com`    |
| Senha            | Senha        | `••••••••`            |
| Nome             | Nome         | `Nome completo`       |

---

## 10. Segurança (OWASP)

- Toda validação de entrada vem do schema `zod` tanto no frontend quanto no backend.
- O backend usa `requireAuth` e `requireRole` como `preHandler` nas rotas protegidas.
- Nunca expor dados sensíveis (tokens, senhas) em logs ou respostas de erro.
- Sempre tipar explicitamente os parâmetros de rota e query para evitar injeção.
- CORS configurado explicitamente (`@fastify/cors`) com origem específica.
