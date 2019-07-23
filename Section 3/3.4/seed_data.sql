insert into [Articles] ([title], [content])
VALUES (
'Article 3',
'TypeScript is an open-source programming language '+
	'developed and maintained by Microsoft. It is a ' +
	'strict syntactical superset of JavaScript, and ' +
	'adds optional static typing to the language. ' +
	'TypeScript is designed for development of large '+
	'applications and transcompiles to JavaScript.'
)


select * from Articles