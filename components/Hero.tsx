import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
// import { FloatingNav } from "./ui/FloatingNavbar";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = -70; // Ajuste para evitar corte da seção
      window.scrollTo({
        top: section.offsetTop + offset,
        behavior: "smooth",
      });

      // Remove o hash da URL após o scroll
      setTimeout(() => {
        history.pushState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }, 1000);
    }
  };

  return (
    <div id="home" className="relative min-h-screen pb-20 pt-36">
      {/* Menu de navegação flutuante */}
      {/* <FloatingNav
        navItems={[
          { name: "Home", link: "#home" },
          { name: "Sobre", link: "#about" },
          { name: "Projetos", link: "#projects" },
          { name: "Contato", link: "#contact" },
        ]}
      /> */}

      {/* UI: Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Background Grid */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center space-y-6">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Desenvolvendo o Futuro com você
          </p>

          <TextGenerateEffect
            words="Conceito transformado em experiência perfeita"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-normal text-xs md:text-sm lg:text-base max-w-lg">
            Bem-vindo à Just Codes, a empresa líder em desenvolvimento de
            softwares e soluções web.
          </p>

          {/* Botão que rola suavemente até "about" */}
          <MagicButton
            title="Trabalhos Realizados"
            icon={<FaLocationArrow />}
            position="right"
            handleClick={() => scrollToSection("about")}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
