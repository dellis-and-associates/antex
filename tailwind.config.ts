import type { Config } from "tailwindcss";

/**
 * Every value below is sourced from necessary-files/design-tokens.json
 * (Antex Brand Foundations v2.0 · red/black identity from new-logo.webp).
 * The same tokens are exposed as CSS custom properties in app/globals.css —
 * keep both in sync.
 */
const config: Config = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			ink: {
  				'900': '#1B1B1B',
  				'950': '#101010'
  			},
  			red: {
  				'50': '#FDECEA',
  				'600': '#E4342B',
  				'700': '#B9241C'
  			},
  			paper: {
  				'50': '#FAFAFA',
  				'200': '#ECECEC'
  			},
  			basalt: {
  				'700': '#3E3E3E'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))'
  		},
  		fontFamily: {
  			display: [
  				'var(--font-display)',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-body)',
  				'sans-serif'
  			],
  			// label/eyebrow text shares the body family (uppercase + tracking
  			// carries the "inspection report" look without a mono face)
  			mono: [
  				'var(--font-body)',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			display: [
  				'clamp(40px, 5vw, 66px)',
  				{
  					lineHeight: '1.04',
  					fontWeight: '800'
  				}
  			],
  			h2: [
  				'clamp(30px, 3.4vw, 42px)',
  				{
  					lineHeight: '1.12',
  					fontWeight: '700'
  				}
  			],
  			h3: [
  				'24px',
  				{
  					lineHeight: '32px',
  					fontWeight: '600'
  				}
  			],
  			body: [
  				'17px',
  				{
  					lineHeight: '28px'
  				}
  			],
  			small: [
  				'14px',
  				{
  					lineHeight: '22px'
  				}
  			],
  			eyebrow: [
  				'13px',
  				{
  					lineHeight: '20px',
  					letterSpacing: '0.16em',
  					fontWeight: '600'
  				}
  			],
  			button: [
  				'15px',
  				{
  					lineHeight: '20px',
  					fontWeight: '600'
  				}
  			]
  		},
  		letterSpacing: {
  			eyebrow: '0.16em'
  		},
  		spacing: {
  			'1': '4px',
  			'2': '8px',
  			'3': '12px',
  			'4': '16px',
  			'6': '24px',
  			'8': '32px',
  			'12': '48px',
  			'16': '64px',
  			'24': '96px'
  		},
  		borderRadius: {
  			// brand radius tokens (design-tokens.json) — NOT the shadcn
  			// calc(--radius) scale, so existing rounded-md/lg usage keeps
  			// its exact live-site values
  			sm: '6px',
  			md: '12px',
  			lg: '20px',
  			pill: '999px'
  		},
  		boxShadow: {
  			card: '0 10px 30px -12px rgba(16, 16, 16, 0.15)',
  			cta: '0 8px 20px -8px rgba(228, 52, 43, 0.5)'
  		},
  		maxWidth: {
  			wrap: '1180px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
