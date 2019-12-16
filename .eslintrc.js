// How to setup:
// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	plugins: ['@typescript-eslint'],
	// NOTE: The order of extends are from left to right, whatever is on the last, that rule set will override some rules of previous rule sets
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier',
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	env: {
		node: true,
		jest: true
	},
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		project: './tsconfig.eslint.json',
		tsConfigRootDir: '.'
	},
	settings: {
		'import/parser': {
			'@typescript-eslint/parser': ['.ts'],
		},
	},
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
		'no-unused-vars': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/explicit-member-accessibility': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/no-unused-vars': [
			1,
			{
				args: 'all',
				ignoreRestSiblings: false,
				argsIgnorePattern: '^_|^args|^parent|^ctx|^info|^type|^target|^returns|^req|^res',
			},
		],
		'@typescript-eslint/camelcase': [
			"error",
			{
				properties: "never"
			}
		],
		'@typescript-eslint/interface-name-prefix': [0, { "prefixWithI": "always" }],
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				semi: false,
				tabWidth: 2,
				singleQuote: true,
				trailingComma: 'all',
				printWidth: 120,
				'object-curly-spacing': ['error', 'always'],
				'array-bracket-spacing': ['error', 'always'],
				'computed-property-spacing': ['error', 'always'],
			},
		],
	},
}
