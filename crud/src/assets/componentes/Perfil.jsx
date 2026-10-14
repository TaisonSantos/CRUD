
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { atualizarPerfil } from "../service/authService";
import { toast } from "react-toastify";

function Icone({ tipo, tamanho = 20, className = "" }) {
  const props = {
    width: tamanho,
    height: tamanho,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flexShrink: 0,
    },
    className,
    "aria-hidden": true,
  };

  switch (tipo) {
    case "usuario":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        </svg>
      );

    case "perfil":
      return (
        <svg {...props}>
          <circle cx="10" cy="8" r="4" />
          <path d="M3 21v-2a7 7 0 0 1 11-5.7" />
          <path d="M19 14v6M16 17h6" />
        </svg>
      );

    case "email":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );

    case "id":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 19a6 6 0 0 1 12 0" />
          <path d="M19 3v4M17 5h4" />
        </svg>
      );

    case "cadeado":
      return (
        <svg {...props}>
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <path d="M12 14v3" />
        </svg>
      );

    case "info":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      );

    case "salvar":
      return (
        <svg {...props}>
          <path d="M5 3h12l4 4v14H3V3h2Z" />
          <path d="M7 3v6h10V3M7 21v-8h10v8" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Perfil() {
  const { usuario } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setNome(usuario?.user_metadata?.nome || "");
  }, [usuario]);

  async function salvarPerfil(e) {
    e.preventDefault();

    if (!nome.trim()) {
      toast.warning("Informe seu nome.");
      return;
    }

    setCarregando(true);

    try {
      const resultado = await atualizarPerfil(nome);

      if (!resultado?.sucesso) {
        toast.error(
          resultado?.erro || "Não foi possível atualizar o perfil."
        );
        return;
      }

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Ocorreu um erro ao atualizar o perfil.");
    } finally {
      setCarregando(false);
    }
  }

  const classeLabel = "mb-2 block text-sm font-semibold text-gray-700";

  const classeInput =
    "block w-full min-w-0 border-0 bg-transparent py-3 text-base text-gray-800 outline-none placeholder:text-gray-400";

  const classeCampo =
    "flex w-full min-w-0 items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 transition focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/10";

  const classeIcone =
    "flex shrink-0 items-center justify-center text-gray-400";

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 pb-6">
      {/* Cabeçalho da página */}
      <header className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
          <Icone tipo="perfil" tamanho={28} />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
            Meu perfil
          </h1>

          <p className="mt-1 text-sm text-gray-500 md:text-base">
            Gerencie suas informações pessoais e os dados da sua conta.
          </p>
        </div>
      </header>

      {/* Painel principal */}
      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Identificação do usuário */}
        <div className="flex items-center gap-4 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-white p-6 md:px-8 md:py-7">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-sm">
            <Icone tipo="usuario" tamanho={32} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-bold text-gray-800">
              {nome || "Seu perfil"}
            </h2>

            <p className="mt-1 truncate text-sm text-gray-500">
              {usuario?.email || "E-mail não disponível"}
            </p>

            <div className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              Conta ativa
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={salvarPerfil} className="p-6 md:p-8">
          <div className="mb-7">
            <h3 className="text-lg font-bold text-gray-800">
              Informações da conta
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Atualize seu nome ou consulte os dados cadastrados.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Nome */}
            <div className="min-w-0">
              <label htmlFor="nome" className={classeLabel}>
                Nome completo
              </label>

              <div className={classeCampo}>
                <span className={classeIcone}>
                  <Icone tipo="usuario" />
                </span>

                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome"
                  autoComplete="name"
                  className={classeInput}
                  required
                />
              </div>
            </div>

            {/* E-mail */}
            <div className="min-w-0">
              <label htmlFor="email" className={classeLabel}>
                E-mail
              </label>

              <div className={`${classeCampo} bg-gray-100`}>
                <span className={classeIcone}>
                  <Icone tipo="email" />
                </span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={usuario?.email || ""}
                  readOnly
                  className={`${classeInput} cursor-not-allowed text-gray-500`}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                O e-mail é somente para consulta nesta tela.
              </p>
            </div>

            {/* ID do usuário */}
            <div className="min-w-0 md:col-span-2">
              <label htmlFor="idUsuario" className={classeLabel}>
                ID do usuário
              </label>

              <div className={`${classeCampo} bg-gray-100`}>
                <span className={classeIcone}>
                  <Icone tipo="id" />
                </span>

                <input
                  id="idUsuario"
                  name="idUsuario"
                  type="text"
                  value={usuario?.id || ""}
                  readOnly
                  className={`${classeInput} font-mono text-sm text-gray-500`}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Identificador único da sua conta no sistema.
              </p>
            </div>
          </div>

          {/* Rodapé do formulário */}
          <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <Icone
                tipo="cadeado"
                tamanho={19}
                className="text-cyan-700"
              />
              Seus dados são vinculados à sua conta.
            </p>

            <button
  type="submit"
  disabled={carregando}
  className="
    group inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5
    rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500
    px-7 py-3 text-sm font-semibold text-white
    shadow-md shadow-cyan-600/20
    transition-all duration-200 ease-out
    hover:-translate-y-0.5 hover:from-cyan-700 hover:to-cyan-600
    hover:shadow-lg hover:shadow-cyan-600/30
    active:translate-y-0 active:scale-[0.98]
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/25
    disabled:cursor-not-allowed disabled:opacity-60
    disabled:hover:translate-y-0 disabled:hover:shadow-md
  "
>
  {carregando ? (
    <>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      Salvando...
    </>
  ) : (
    <>
      <Icone
        tipo="salvar"
        tamanho={19}
        className="transition-transform duration-200 group-hover:scale-110"
      />
      Salvar alterações
    </>
  )}
</button>
          </div>
        </form>
      </section>

      {/* Informação complementar */}
      <section className="flex w-full min-w-0 items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 md:p-6">
        <Icone
          tipo="info"
          tamanho={22}
          className="mt-0.5 text-cyan-700"
        />

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-800">
            Sobre sua conta
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Seu perfil identifica o usuário responsável pelos produtos
            cadastrados no sistema. O e-mail e o ID são exibidos para
            consulta, enquanto o nome pode ser alterado por aqui.
          </p>
        </div>
      </section>
    </div>
  );
}
