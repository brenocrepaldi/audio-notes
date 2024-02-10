// Importa o React para criar elementos React
import React from "react";
// Importa o ReactDOM para renderizar elementos React no DOM
import ReactDOM from "react-dom/client";
// Importa o componente principal da aplicação
import { App } from "./app";
// Importa o componente Toaster do pacote sonner para exibir notificações
import { Toaster } from "sonner";
// Importa o arquivo de estilos globais
import "./index.css";

// Usa o ReactDOM.createRoot para renderizar o aplicativo no elemento root do DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
	// O React.StrictMode é um componente usado para identificar e alertar sobre práticas desatualizadas
	// Ele envolve o aplicativo para destacar possíveis problemas e melhorar a performance no futuro
	<React.StrictMode>
		{/* Renderiza o componente principal da aplicação */}
		<App />
		{/* Renderiza o componente Toaster para exibir notificações, com a propriedade richColors ativada */}
		<Toaster richColors />
	</React.StrictMode>
);
