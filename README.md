# Lucanza Lobato — Landing page (redesign)

Site estático (HTML5 + CSS3 modular + JavaScript puro) desenvolvido pela Lauwer.Dev. Funciona no GitHub Pages e em hospedagem convencional, sem build.

## Direção de arte

- Estética editorial: fotos grandes em formato de arco, moldura dourada, títulos em Playfair Display e texto em Manrope.
- Fundos alternados (branco, lavanda, bege). O roxo profundo fica para as seções de destaque: Conteúdos e CTA final.
- Cores: `#7964A8`, `#35254D`, `#F8F5FC`, `#FFFFFF`, `#F3ECE4`, `#D9B889`.

## Estrutura

```
index.html
css/   style.css (importa todos) + global, header, hero, about, benefits,
       services, steps, social, testimonials, faq, contact, cta, footer
js/    main.js
img/   imagens de espaço reservado (SVG) — substituir por fotos reais
logo/  logo.svg, favicon.svg
robots.txt, sitemap.xml
```

## Fotos a substituir

Cada espaço reservado traz o rótulo "FOTO A SUBSTITUIR". Ao trocar, mantenha a proporção, use WebP, atualize o `src`, o `alt` (descrevendo a foto real) e `width`/`height` no `index.html`.

| Arquivo | Proporção | Conteúdo |
|---|---|---|
| hero | 5:6 | Lucanza com um animal, em atendimento real autorizado |
| sobre | 4:5 | Retrato profissional |
| beneficios-1 / beneficios-2 | 4:5 / 3:2 | Ambiente domiciliar e detalhe do cuidado |
| servico-consulta / -acompanhamento / -orientacao | 4:3 | Um por serviço |
| social-1 a social-6 | 4:5 | Miniaturas de publicações **autorizadas** (a 1ª é maior) |
| og.jpg | 1200×630 | Imagem de compartilhamento |

## Pendências antes de publicar (CONFIRMAR)

Procure por `CONFIRMAR` no projeto.

- [ ] Número de WhatsApp: constante `NUMERO_WHATSAPP` em `js/main.js` (hoje é falso)
- [ ] CRMV, formação, trajetória e abordagem (seção Sobre e rodapé)
- [ ] Lista real de atendimentos (cards e opções do formulário)
- [ ] Regiões atendidas, horários, política sobre valores, e-mail de contato
- [ ] URLs reais de Instagram e TikTok (seção Conteúdos e rodapé)
- [ ] Domínio definitivo: canonical, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`
- [ ] Fotos reais autorizadas e miniaturas de publicações reais
- [ ] Favicon PNG e `apple-touch-icon.png` (gerar a partir de `logo/favicon.svg`)
- [ ] Depoimentos: remover `hidden` da seção só com relatos autênticos e autorizados
- [ ] Política de privacidade completa
- [ ] Autorização do crédito "Desenvolvido por Lauwer.Dev"
- [ ] Revisão do conteúdo quanto às regras de publicidade do CFMV/CRMV
- [ ] Número de seguidores: não está no site. Só incluir se a Lucanza confirmar e autorizar.

## Verificado até agora

Renderização em 375, 768 e 1440 px sem rolagem horizontal; menu mobile (abrir, foco, Escape); validação do formulário e limpeza de erros; link do WhatsApp do CTA.

## Ainda não testado

Lighthouse, validador HTML, contraste medido, zoom 200%, leitor de tela e fontes do Google (bloqueadas no ambiente de teste, onde caíram para fontes padrão). Não afirme conformidade com WCAG nem pontuação no Lighthouse antes disso.

## Publicar no GitHub Pages

1. Crie um repositório e envie os arquivos na raiz.
2. Settings → Pages → Source: branch `main`, pasta `/ (root)`.
3. Os caminhos são relativos, então funciona também em subpasta.
