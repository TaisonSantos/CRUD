
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { atualizarPerfil } from "../service/authService";
import { toast } from "react-toastify";

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

      if (!resultado.sucesso) {
        toast.error(resultado.erro || "Não foi possível atualizar o perfil.");
        return;
      }

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast.error("Ocorreu um erro ao atualizar o perfil.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Meu perfil
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Consulte e atualize os dados da sua conta.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
            <span className="material-symbols-outlined text-4xl">
              person
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {nome || "Seu perfil"}
            </h2>
            <p className="text-sm text-gray-500">
              Dados da conta
            </p>
          </div>
        </div>

        <form onSubmit={salvarPerfil} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="nome"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nome
            </label>

            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={usuario?.email || ""}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
            />

            <p className="mt-1 text-xs text-gray-400">
              O e-mail é apenas para consulta nesta tela.
            </p>
          </div>

          <div>
            <label
              htmlFor="idUsuario"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ID do usuário
            </label>

            <input
              id="idUsuario"
              type="text"
              value={usuario?.id || ""}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500"
            />
          </div>

          <div className="flex justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={carregando}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-xl">
                save
              </span>

              {carregando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
