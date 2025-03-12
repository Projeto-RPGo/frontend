import { NextResponse } from "next/server";

const doms = [
  { id: 1, nome: "Kaji", descricao: "lorem ipsum" },
  { id: 2, nome: "Hikari", descricao: "lorem ipsum" },
  { id: 3, nome: "Yami", descricao: "lorem ipsum" },
];
const domSpecific = { id: 1, nome: "Kaji", descricao: "lorem ipsum" };
const domSpecificPlayer = [
  { id: 1, nome: "Kaji", descricao: "lorem ipsum" },
  { id: 2, nome: "Hikari", descricao: "lorem ipsum" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const domId = searchParams.get("domId");
  const userId = searchParams.get("userId");

  try {
    if (!domId && !userId) {
      return NextResponse.json(doms, { status: 200 });
    }
    if (domId) {
      return NextResponse.json(domSpecific, { status: 200 });
    } else if (userId) {
      return NextResponse.json(domSpecificPlayer, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Opa, deu ruim" }, { status: 500 });
  }
}
