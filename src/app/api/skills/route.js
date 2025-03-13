import { NextResponse } from "next/server";

const skillsData = {
  habilidades: [
    { id: 1, nome: "Fogo", slots: ["a", "b", "c", "d", "e"] },
    { id: 2, nome: "Fumaça", slots: ["v", "w", "x", "y", "z"] },
  ],
  mcf: [
    {
      id: 18,
      idHab1: 1,
      nome: "Plasma",
      slots: ["a1", "b1", "c1", "d1", "e1"],
    },
  ],
  especializacoes: [
    {
      id: 23,
      idHab1: 2,
      nome: "Caminho Fumaça Incandescente",
      descricao: "lorem epsum",
    },
    {
      id: 24,
      idHab1: 2,
      nome: "Caminho Fumaça Gélida",
      descricao: "lorem epsum",
    },
    {
      id: 25,
      idHab1: 2,
      nome: "Caminho Fumaça Densa",
      descricao: "lorem epsum",
    },
  ],
  dominioMax: {
    id: 23,
    idHab1: 2,
    nome: "Fumaça Verdadeira",
    descricao: "lorem epsum",
  },
};

const skillsDataWithId = {
  habilidades: [
    { id: 1, nome: "Fogo", slots: ["a", "b", "c"] },
    { id: 2, nome: "Fumaça", slots: ["x", "y", "z"] },
  ],
  mcf: [{ id: 18, idHab1: 1, nome: "Plasma", slots: ["a"] }],
  especializacoes: [
    {
      id: 23,
      idHab1: 2,
      nome: "Caminho Fumaça Incandescente",
      descricao: "lorem epsum",
    },
  ],
  dominioMax: {
    id: 23,
    idHab1: 2,
    nome: "Fumaça Verdadeira",
    descricao: "lorem epsum",
  },
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const domId = searchParams.get("domId");
  const userId = searchParams.get("userId");

  try {
    if (!domId) {
      return NextResponse.json(
        { message: "Parâmetro 'domId' é obrigatório" },
        { status: 400 }
      );
    }
    if (userId) {
      return NextResponse.json(skillsDataWithId, { status: 200 });
    } else {
      return NextResponse.json(skillsData, { status: 200 });
    }

  } catch (error) {
    return NextResponse.json({ message: "Opa, deu ruim" }, { status: 500 });
  }
}
