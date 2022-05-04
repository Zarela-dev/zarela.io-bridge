import { createGlobalStyle, css } from 'styled-components'

const cursorStyles = css`
  .cursor-wrap {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 99999;
  }
  .cursor {
    position: fixed;
    top: -30px;
    left: -30px;
  }
  .circle {
    transform: scale(0.8);
    transition: all 0.2s ease-in-out;
  }
  @media only screen and (max-width: 1024px) {
    .cursor-wrap {
      display: none;
    }
  }
`

const ToastifyOverrides = css`
  :root {
    --toastify-color-dark: #514a5c;
    --toastify-color-success: #34c889;
  }

  .Toastify__toast {
    border-radius: 16px;
    box-shadow: 0px 8px 24px 12px rgba(0, 0, 0, 0.2);
    padding: 12px;
  }
`
const GlobalStyle = createGlobalStyle`
 /* http://meyerweb.com/eric/tools/css/reset/ 
		v2.0 | 20110126
		License: none (public domain)
	*/

	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
		background-color: #181120;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

 .c3-chart-arc.c3-target g path {
   stroke: none;
 }

 input[type="file"] {
	display: none;
 }



 /* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #70697A;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #332C3F;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #332C3F;
}



 ${ToastifyOverrides}
 ${cursorStyles}
`

export default GlobalStyle
