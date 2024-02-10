import { ChangeEvent, useState } from "react"; // Importa os hooks useState e ChangeEvent do React para manipulação de estado e eventos
import logo from "./assets/logo-nlw-expert.svg"; // Importa o logo da aplicação
import { NewNoteCard } from "./components/new-note-card"; // Importa o componente NewNoteCard para adicionar novas notas
import { NoteCard } from "./components/note-card"; // Importa o componente NoteCard para exibir notas existentes

interface Note {
	id: string;
	date: Date;
	content: string;
}

export function App() {
	// Componente principal da aplicação

	// Estado para controlar o texto de pesquisa
	const [search, setSearch] = useState("");

	// Estado para armazenar as notas
	const [notes, setNotes] = useState<Note[]>(() => {
		const notesOnStorage = localStorage.getItem("notes"); // Busca notas armazenadas no localStorage do navegador

		if (notesOnStorage) {
			return JSON.parse(notesOnStorage); // Se existirem notas, converte-as para um array de objetos
		}

		return []; // Caso contrário, retorna um array vazio
	});

	// Função para adicionar uma nova nota
	function onNoteCreated(content: string) {
		const newNote = {
			id: crypto.randomUUID(), // Gera um ID único para a nova nota
			date: new Date(), // Define a data atual para a nova nota
			content, // Define o conteúdo da nota como o texto recebido como parâmetro
		};

		const notesArray = [newNote, ...notes]; // Adiciona a nova nota ao início do array de notas existentes

		setNotes(notesArray); // Atualiza o estado das notas com o novo array

		localStorage.setItem("notes", JSON.stringify(notesArray)); // Salva as notas atualizadas no localStorage do navegador
	}

	// Função para deletar uma nota
	function onNoteDeleted(id: string) {
		const notesArray = notes.filter((note) => note.id !== id); // Filtra as notas removendo aquela com o ID recebido como parâmetro

		setNotes(notesArray); // Atualiza o estado das notas com o novo array sem a nota deletada

		localStorage.setItem("notes", JSON.stringify(notesArray)); // Salva as notas atualizadas no localStorage do navegador
	}

	// Função para lidar com a mudança no campo de pesquisa
	function handleSearch(event: ChangeEvent<HTMLInputElement>) {
		const query = event.target.value; // Obtém o valor do campo de pesquisa
		setSearch(query); // Atualiza o estado de pesquisa com o novo valor
	}

	// Filtrar as notas com base na pesquisa
	const filteredNotes =
		search === "" // Se o campo de pesquisa estiver vazio
			? notes // Retorna todas as notas
			: notes.filter((note) =>
					note.content.toLowerCase().includes(search.toLowerCase())
			  ); // Caso contrário, filtra as notas cujo conteúdo inclua o texto da pesquisa (ignorando maiúsculas e minúsculas)

	return (
		<div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
			{" "}
			{/* Define a estrutura principal da aplicação */}
			{/* Logo da aplicação */}
			<img src={logo} alt="Logo NLW Expert" />
			{/* Formulário de pesquisa */}
			<form className="w-full">
				<input
					type="text"
					placeholder="Busque em suas notas..."
					className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
					onChange={handleSearch} // Chama a função handleSearch sempre que o conteúdo do campo de pesquisa é alterado
				/>
			</form>
			{/* Divisória */}
			<div className="h-px bg-slate-700"></div>
			{/* Grade de notas */}
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
				{/* Componente para adicionar nova nota */}
				<NewNoteCard onNoteCreated={onNoteCreated} />{" "}
				{/* Passa a função onNoteCreated como prop para o componente NewNoteCard */}
				{/* Mapear e exibir notas filtradas */}
				{filteredNotes.map((note) => (
					<NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
				))}{" "}
				{/* Mapeia cada nota filtrada para renderizar o componente NoteCard, passando a nota e a função onNoteDeleted como props */}
			</div>
		</div>
	);
}
