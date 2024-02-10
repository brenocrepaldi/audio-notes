// Importa todos os elementos do módulo de diálogo do Radix UI e os associa ao objeto Dialog
import * as Dialog from "@radix-ui/react-dialog";
// Importa a função formatDistanceToNow do pacote date-fns para formatar datas
import { formatDistanceToNow } from "date-fns";
// Importa o objeto ptBR do pacote date-fns/locale para fornecer configurações de localização específicas para o português do Brasil
import { ptBR } from "date-fns/locale";
// Importa o ícone X do pacote lucide-react para representar um botão de fechar ou cancelar
import { X } from "lucide-react";

// Define a interface das propriedades do componente NoteCard
interface NoteCardProps {
	note: {
		id: string;
		date: Date;
		content: string;
	};
	onNoteDeleted: (id: string) => void;
}

// Define o componente NoteCard
export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
	// Componente de Card de Nota

	return (
		<Dialog.Root>
			{" "}
			{/* Componente raiz do diálogo */}
			{/* Abre o modal com um clique */}
			<Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
				<span className="text-sm font-medium text-slate-300">
					{/* Formata a data da nota */}
					{formatDistanceToNow(note.date, {
						locale: ptBR, // Define o local como português do Brasil
						addSuffix: true, // Adiciona um sufixo como "há 5 minutos"
					})}
				</span>
				<p className="text-sm leading-6 text-slate-400">{note.content}</p>

				{/* Gradiente que cobre a parte inferior do card */}
				<div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
			</Dialog.Trigger>
			<Dialog.Portal>
				{" "}
				{/* Renderiza o conteúdo do diálogo fora da hierarquia DOM */}
				{/* Overlay que cobre a tela */}
				<Dialog.DialogOverlay className="inset-0 fixed bg-black/60" />
				{/* Conteúdo do modal */}
				<Dialog.DialogContent className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
					{/* Botão de fechar o modal */}
					<Dialog.Close className="absolute right-1.5 top-1.5 bg-slate-800 p-1.5 text-slate-400 rounded-md group">
						<X className="size-5 group-hover:text-slate-100" />
					</Dialog.Close>

					{/* Conteúdo do card dentro do modal */}
					<div className="flex flex-1 flex-col gap-3 p-5">
						<span className="text-sm font-medium text-slate-300">
							{/* Formata a data da nota */}
							{formatDistanceToNow(note.date, {
								locale: ptBR, // Define o local como português do Brasil
								addSuffix: true, // Adiciona um sufixo como "há 5 minutos"
							})}
						</span>
						<p className="text-sm leading-6 text-slate-400">{note.content}</p>
					</div>

					{/* Botão para deletar a nota */}
					<button
						type="button"
						onClick={() => onNoteDeleted(note.id)} // Chama a função onNoteDeleted passando o ID da nota como parâmetro
						className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
					>
						Deseja{" "}
						<span className="text-red-400 group-hover:underline">
							apagar essa nota
						</span>
						?
					</button>
				</Dialog.DialogContent>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
