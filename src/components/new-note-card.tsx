// Importações do React
import { ChangeEvent, FormEvent, useState } from "react";
// Importações do Radix UI para o diálogo
import * as Dialog from "@radix-ui/react-dialog";
// Importação de um ícone para o botão de fechar ou cancelar do diálogo
import { X } from "lucide-react";
// Importação da função toast do pacote sonner para exibir mensagens de notificação
import { toast } from "sonner";

// Interface das propriedades do componente NewNoteCard
interface NewNoteCardProps {
	onNoteCreated: (content: string) => void;
}

// Declaração da variável global para reconhecimento de fala
let speechRecognition: SpeechRecognition | null;

// Componente NewNoteCard
export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
	// Estados do componente
	const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
	const [content, setContent] = useState("");
	const [isRecording, setIsRecording] = useState(false);

	// Função para iniciar o editor
	function handleStartEditor() {
		setShouldShowOnboarding(false);
	}

	// Função para alterar o conteúdo
	function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setContent(event.target.value);
		if (event.target.value === "") {
			setShouldShowOnboarding(true);
		}
	}

	// Função para salvar a nota
	function handleSaveNote(event: FormEvent) {
		event.preventDefault();
		if (content.trim() === "") {
			return;
		}
		onNoteCreated(content);
		setContent("");
		setShouldShowOnboarding(true);
		toast.success("Nota criada com sucesso!");
	}

	// Função para iniciar a gravação de voz e integração da API
	function handleStartRecording() {
		const isSpeechRecognitionAPIAvailable =
			"SpeechRecognition" in window || "webkitSpeechRecognition" in window;
		if (!isSpeechRecognitionAPIAvailable) {
			alert("Seu navegador não suporta a funcionalidade de gravação de voz!");
		}
		setIsRecording(true);
		setShouldShowOnboarding(false);
		const SpeechRecognitionAPI =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		speechRecognition = new SpeechRecognitionAPI();
		speechRecognition.lang = "pt-BR";
		speechRecognition.continuous = true;
		speechRecognition.maxAlternatives = 1;
		speechRecognition.interimResults = true;
		speechRecognition.onresult = (event) => {
			const transcription = Array.from(event.results).reduce((text, result) => {
				return text.concat(result[0].transcript);
			}, "");
			setContent(transcription);
		};
		speechRecognition.onerror = (event) => {
			console.error(event);
		};
		speechRecognition.start();
	}

	// Função para interromper a gravação de voz
	function handleStopRecording() {
		setIsRecording(false);
		if (speechRecognition !== null) {
			speechRecognition.stop();
		}
	}

	// Retorno do componente NewNoteCard
	return (
		<Dialog.Root>
			{" "}
			{/* Componente raiz do diálogo */}
			<Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
				<span className="text-sm font-medium text-slate-200">
					Adicionar nota
				</span>
				<p className="text-sm leading-6 text-slate-400">
					Grave uma nota em áudio que será convertida para texto automaticamente
				</p>
			</Dialog.Trigger>
			<Dialog.Portal>
				{" "}
				{/* Renderiza o conteúdo do diálogo fora da hierarquia DOM */}
				<Dialog.DialogOverlay className="inset-0 fixed bg-black/60" />
				<Dialog.DialogContent className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
					<Dialog.Close className="absolute right-1.5 top-1.5 bg-slate-800 p-1.5 text-slate-400 rounded-md group">
						<X className="size-5 group-hover:text-slate-100" />
					</Dialog.Close>
					<form className="flex-1 flex flex-col">
						<div className="flex flex-1 flex-col gap-3 p-5">
							<span className="text-sm font-medium text-slate-300">
								Adicionar nota
							</span>
							{shouldShowOnboarding ? (
								<p className="text-sm leading-6 text-slate-400">
									Comece{" "}
									<button
										type="button"
										className="font-medium text-lime-400 hover:underline"
										onClick={handleStartRecording}
									>
										gravando uma nota
									</button>{" "}
									em áudio ou se preferir{" "}
									<button
										type="button"
										className="font-medium text-lime-400 hover:underline"
										onClick={handleStartEditor}
									>
										utilize apenas texto
									</button>
									.
								</p>
							) : (
								<textarea
									autoFocus
									className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
									onChange={handleContentChange}
									value={content}
								/>
							)}
						</div>
						{isRecording ? (
							<button
								type="button"
								onClick={handleStopRecording}
								className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
							>
								<div className="size-3 rounded-full bg-red-500 animate-pulse" />
								Gravando! (clique para interromper)
							</button>
						) : (
							<button
								type="button"
								onClick={handleSaveNote}
								className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
							>
								Salvar nota
							</button>
						)}
					</form>
				</Dialog.DialogContent>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
