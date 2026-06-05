/**
 * db.js
 * Emulador de base de datos SQL utilizando localStorage de JavaScript.
 * Desarrollado para permitir el funcionamiento de las páginas dinámicas en GitHub Pages.
 */

const db = {
    // Guarda una base de datos completa (objeto con tablas) en localStorage
    saveDb: function(dbName, data) {
        localStorage.setItem(`db_${dbName}`, JSON.stringify(data));
    },

    // Carga una base de datos completa de localStorage
    loadDb: function(dbName) {
        const data = localStorage.getItem(`db_${dbName}`);
        return data ? JSON.parse(data) : null;
    },

    // Obtiene una tabla específica de una base de datos
    get: function(dbName, tableName) {
        const fullDb = this.loadDb(dbName);
        return fullDb && fullDb[tableName] ? fullDb[tableName] : [];
    },

    // Guarda una tabla específica de una base de datos
    saveTable: function(dbName, tableName, tableData) {
        const fullDb = this.loadDb(dbName) || {};
        fullDb[tableName] = tableData;
        this.saveDb(dbName, fullDb);
    },

    // Inserta un nuevo registro en una tabla con ID autoincrementable
    insert: function(dbName, tableName, row, idColumn = 'id') {
        const table = this.get(dbName, tableName);
        
        // Calcular el próximo ID autoincrementable
        let nextId = 1;
        if (table.length > 0) {
            const ids = table.map(r => parseInt(r[idColumn]) || 0);
            nextId = Math.max(...ids) + 1;
        }
        
        row[idColumn] = nextId;
        table.push(row);
        this.saveTable(dbName, tableName, table);
        return nextId;
    },

    // Elimina un registro de una tabla por su ID
    delete: function(dbName, tableName, idColumn, idVal) {
        const table = this.get(dbName, tableName);
        const filtered = table.filter(r => String(r[idColumn]) !== String(idVal));
        this.saveTable(dbName, tableName, filtered);
        return true;
    },

    // Obtiene la estructura por defecto si no existen los archivos JSON
    getFallback: function(dbName) {
        switch (dbName) {
            case 'universoheroes':
                return {
                    universos: [
                        { "id": 1, "nombre_universo": "Marvel" },
                        { "id": 2, "nombre_universo": "DC Comics" },
                        { "id": 3, "nombre_universo": "Pacific Rim" },
                        { "id": 4, "nombre_universo": "Anime" }
                    ],
                    superheroes: []
                };
            case 'pacific_rim':
                return {
                    jaegers: [
                        {"id": 1, "nombre": "Gipsy Danger", "pais": "Estados Unidos", "generacion": 3, "altura_m": 79.2, "peso_ton": 1980, "estado": "Destruido"},
                        {"id": 2, "nombre": "Striker Eureka", "pais": "Australia", "generacion": 5, "altura_m": 76.2, "peso_ton": 1850, "estado": "Destruido"},
                        {"id": 3, "nombre": "Cherno Alpha", "pais": "Rusia", "generacion": 1, "altura_m": 85.3, "peso_ton": 2412, "estado": "Destruido"},
                        {"id": 4, "nombre": "Crimson Typhoon", "pais": "China", "generacion": 4, "altura_m": 76.2, "peso_ton": 1722, "estado": "Destruido"}
                    ],
                    batallas: [],
                    kaijus: [],
                    pilotos: []
                };
            case 'c_r_o':
                return {
                    personajes: [
                        {"ID": 1, "Nombre": "Peter Parker", "Alias": "Spider-Man", "FechaDeCreacion": "1962-08-01", "Descripcion": "El superhéroe que teje telarañas."},
                        {"ID": 2, "Nombre": "Tony Stark", "Alias": "Iron Man", "FechaDeCreacion": "1963-03-01", "Descripcion": "Genio, multimillonario, playboy y filántropo."},
                        {"ID": 3, "Nombre": "Steve Rogers", "Alias": "Captain America", "FechaDeCreacion": "1941-03-01", "Descripcion": "El supersoldado con el escudo indestructible."},
                        {"ID": 4, "Nombre": "Natasha Romanoff", "Alias": "Black Widow", "FechaDeCreacion": "1964-04-01", "Descripcion": "Espía y luchadora experta."},
                        {"ID": 5, "Nombre": "Bruce Banner", "Alias": "Hulk", "FechaDeCreacion": "1962-05-01", "Descripcion": "Se convierte en un gigante verde cuando se enfurece."}
                    ],
                    comics: [
                        {"ID": 1, "Titulo": "The Amazing Spider-Man #1", "AnioPublicacion": 1963, "Descripcion": "El debut de Spider-Man."},
                        {"ID": 2, "Titulo": "Tales of Suspense #39", "AnioPublicacion": 1963, "Descripcion": "El nacimiento de Iron Man."},
                        {"ID": 3, "Titulo": "Captain America Comics #1", "AnioPublicacion": 1941, "Descripcion": "La primera aparición del Capitán América."},
                        {"ID": 4, "Titulo": "Tales of Suspense #52", "AnioPublicacion": 1964, "Descripcion": "La presentación de Black Widow."},
                        {"ID": 5, "Titulo": "The Incredible Hulk #1", "AnioPublicacion": 1962, "Descripcion": "El primer cómic de Hulk."}
                    ],
                    superpoderes: [
                        {"ID": 1, "Nombre": "Trepar paredes", "Descripcion": "Spider-Man puede adherirse a surfaces verticales y techos."},
                        {"ID": 2, "Nombre": "Traje de Iron Man", "Descripcion": "Tony Stark utiliza una armadura con numerosas habilidades."},
                        {"ID": 3, "Nombre": "Suero del supersoldado", "Descripcion": "Steve Rogers obtiene fuerza y agilidad sobrehumanas."},
                        {"ID": 4, "Nombre": "Espionaje y combate", "Descripcion": "Black Widow es experta en espionaje y combate mano a mano."},
                        {"ID": 5, "Nombre": "Transformación", "Descripcion": "Bruce Banner se convierte en Hulk con una gran fuerza."}
                    ],
                    personajecomic: [
                        {"PersonajeID": 1, "ComicID": 1},
                        {"PersonajeID": 2, "ComicID": 2},
                        {"PersonajeID": 3, "ComicID": 3},
                        {"PersonajeID": 4, "ComicID": 4},
                        {"PersonajeID": 5, "ComicID": 5}
                    ],
                    personajesuperpoder: [
                        {"PersonajeID": 1, "SuperpoderID": 1},
                        {"PersonajeID": 2, "SuperpoderID": 2},
                        {"PersonajeID": 3, "SuperpoderID": 3},
                        {"PersonajeID": 4, "SuperpoderID": 4},
                        {"PersonajeID": 5, "SuperpoderID": 5}
                    ]
                };
            case 'cine':
                return {
                    peliculas: [
                        {"PeliculaID": 1, "Titulo": "Inception", "AnioLanzamiento": 2010, "DirectorID": 1},
                        {"PeliculaID": 2, "Titulo": "Pulp Fiction", "AnioLanzamiento": 1994, "DirectorID": 2},
                        {"PeliculaID": 3, "Titulo": "Goodfellas", "AnioLanzamiento": 1990, "DirectorID": 3},
                        {"PeliculaID": 4, "Titulo": "Jurassic Park", "AnioLanzamiento": 1993, "DirectorID": 4},
                        {"PeliculaID": 5, "Titulo": "The Godfather", "AnioLanzamiento": 1972, "DirectorID": 5},
                        {"PeliculaID": 6, "Titulo": "The Shining", "AnioLanzamiento": 1980, "DirectorID": 6},
                        {"PeliculaID": 7, "Titulo": "Psycho", "AnioLanzamiento": 1960, "DirectorID": 7},
                        {"PeliculaID": 8, "Titulo": "Titanic", "AnioLanzamiento": 1997, "DirectorID": 8},
                        {"PeliculaID": 9, "Titulo": "The Lord of the Rings", "AnioLanzamiento": 2001, "DirectorID": 9},
                        {"PeliculaID": 10, "Titulo": "Fight Club", "AnioLanzamiento": 1999, "DirectorID": 10}
                    ],
                    directores: [
                        {"DirectorID": 1, "Nombre": "Christopher Nolan", "Nacionalidad": "Británica", "FechaNacimiento": "1970-07-30"},
                        {"DirectorID": 2, "Nombre": "Quentin Tarantino", "Nacionalidad": "Estadounidense", "FechaNacimiento": "1963-03-27"},
                        {"DirectorID": 3, "Nombre": "Martin Scorsese", "Nacionalidad": "Estadounidense", "FechaNacimiento": "1942-11-17"},
                        {"DirectorID": 4, "Nombre": "Steven Spielberg", "Nacionalidad": "Estadounidense", "FechaNacimiento": "1946-12-18"},
                        {"DirectorID": 5, "Nombre": "Francis Ford Coppola", "Nacionalidad": "Estadounidense", "FechaNacimiento": "1939-04-07"},
                        {"DirectorID": 6, "Nombre": "Stanley Kubrick", "Nacionalidad": "Estadounidense", "FechaNacimiento": "1928-07-26"},
                        {"DirectorID": 7, "Nombre": "Alfred Hitchcock", "Nacionalidad": "Británica", "FechaNacimiento": "1899-08-13"},
                        {"DirectorID": 8, "Nombre": "James Cameron", "Nacionalidad": "Canadiense", "FechaNacimiento": "1954-08-16"},
                        {"DirectorID": 9, "Nombre": "Peter Jackson", "Nacionalidad": "Neozelandesa", "FechaNacimiento": "1961-10-31"},
                        {"DirectorID": 10, "Nombre": "David Fincher", "Nacionalidad": "Estadounidense", "FechaNacimiento": "1962-08-28"}
                    ],
                    actores: [
                        {"ActorID": 1, "Nombre": "Leonardo DiCaprio", "PremioOscar": 1},
                        {"ActorID": 2, "Nombre": "Brad Pitt", "PremioOscar": 1},
                        {"ActorID": 3, "Nombre": "Robert De Niro", "PremioOscar": 1},
                        {"ActorID": 4, "Nombre": "Tom Hanks", "PremioOscar": 1},
                        {"ActorID": 5, "Nombre": "Al Pacino", "PremioOscar": 1},
                        {"ActorID": 6, "Nombre": "Jack Nicholson", "PremioOscar": 1},
                        {"ActorID": 7, "Nombre": "Marlon Brando", "PremioOscar": 1},
                        {"ActorID": 8, "Nombre": "Morgan Freeman", "PremioOscar": 1},
                        {"ActorID": 9, "Nombre": "Christian Bale", "PremioOscar": 1},
                        {"ActorID": 10, "Nombre": "Samuel L. Jackson", "PremioOscar": 0},
                        {"ActorID": 11, "Nombre": "Anthony Perkins", "PremioOscar": 0},
                        {"ActorID": 12, "Nombre": "Janet Leigh", "PremioOscar": 0},
                        {"ActorID": 13, "Nombre": "Kate Winslet", "PremioOscar": 0},
                        {"ActorID": 14, "Nombre": "Elijah Wood", "PremioOscar": 0},
                        {"ActorID": 15, "Nombre": "Ian McKellen", "PremioOscar": 0},
                        {"ActorID": 16, "Nombre": "Edward Norton", "PremioOscar": 0},
                        {"ActorID": 17, "Nombre": "Elijah Wood", "PremioOscar": 0},
                        {"ActorID": 18, "Nombre": "Ian McKellen", "PremioOscar": 0}
                    ],
                    peliculaactor: [
                        {"PeliculaID": 1, "ActorID": 1, "Personaje": "Cobb"},
                        {"PeliculaID": 1, "ActorID": 2, "Personaje": "Colaborador Ficticio"},
                        {"PeliculaID": 2, "ActorID": 10, "Personaje": "Jules Winnfield"},
                        {"PeliculaID": 3, "ActorID": 3, "Personaje": "Jimmy Conway"},
                        {"PeliculaID": 4, "ActorID": 10, "Personaje": "Ray Arnold"},
                        {"PeliculaID": 5, "ActorID": 5, "Personaje": "Michael Corleone"},
                        {"PeliculaID": 5, "ActorID": 7, "Personaje": "Vito Corleone"},
                        {"PeliculaID": 6, "ActorID": 6, "Personaje": "Jack Torrance"},
                        {"PeliculaID": 7, "ActorID": 11, "Personaje": "Norman Bates"},
                        {"PeliculaID": 7, "ActorID": 12, "Personaje": "Marion Crane"},
                        {"PeliculaID": 8, "ActorID": 1, "Personaje": "Jack Dawson"},
                        {"PeliculaID": 9, "ActorID": 14, "Personaje": "Frodo Baggins"},
                        {"PeliculaID": 9, "ActorID": 15, "Personaje": "Gandalf"},
                        {"PeliculaID": 10, "ActorID": 2, "Personaje": "Tyler Durden"}
                    ]
                };
            case 'batman':
                return {
                    linterna_verde: [
                        {
                            "id": 1,
                            "nombrereal": "Hal Jordan",
                            "personaje": "Green Lantern",
                            "altura": 1.88,
                            "peso": 86,
                            "poderes": "Creación de constructos de energía pura mediante anillo de voluntad.",
                            "sexo": "Masculino",
                            "debilidad": "Impureza amarilla (miedo)",
                            "creation": "1959-10-01",
                            "biografia": "Un piloto de pruebas de la Fuerza Aérea que se une a la corporación intergaláctica Green Lantern Corps."
                        }
                    ]
                };
            case 'jujutsu_kaisen':
                return {
                    bandos: [
                        {"id_bando": 1, "nombre": "Bueno"},
                        {"id_bando": 2, "nombre": "Malo"}
                    ],
                    personajes: [
                        {"id_personaje": 1, "nombre": "Yuji Itadori", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 2, "nombre": "Satoru Gojo", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 3, "nombre": "Sukuna", "tipo": "Maldicion", "id_bando": 2},
                        {"id_personaje": 4, "nombre": "Mahito", "tipo": "Maldicion", "id_bando": 2},
                        {"id_personaje": 7, "nombre": "Megumi Fushiguro", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 8, "nombre": "Nobara Kugisaki", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 9, "nombre": "Maki Zenin", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 10, "nombre": "Toge Inumaki", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 11, "nombre": "Panda", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 12, "nombre": "Kento Nanami", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 13, "nombre": "Yuta Okkotsu", "tipo": "Hechicero", "id_bando": 1},
                        {"id_personaje": 14, "nombre": "Ryomen Sukuna", "tipo": "Maldicion", "id_bando": 2},
                        {"id_personaje": 16, "nombre": "Suguru Geto", "tipo": "Maldicion", "id_bando": 2},
                        {"id_personaje": 17, "nombre": "Jogo", "tipo": "Maldicion", "id_bando": 2},
                        {"id_personaje": 18, "nombre": "Hanami", "tipo": "Maldicion", "id_bando": 2},
                        {"id_personaje": 19, "nombre": "Dagon", "tipo": "Maldicion", "id_bando": 2},
                        {"id_personaje": 20, "nombre": "Toji Fushiguro", "tipo": "Asesino", "id_bando": 2}
                    ],
                    tecnicas: [
                        {"id_tecnica": 1, "nombre": "Black Flash"},
                        {"id_tecnica": 2, "nombre": "Limitless"},
                        {"id_tecnica": 3, "nombre": "Dominio Maldito"}
                    ],
                    personaje_tecnica: [
                        {"id": 1, "id_personaje": 1, "id_tecnica": 1},
                        {"id": 2, "id_personaje": 2, "id_tecnica": 2},
                        {"id": 3, "id_personaje": 3, "id_tecnica": 3},
                        {"id": 4, "id_personaje": 4, "id_tecnica": 3}
                    ]
                };
            default:
                return {};
        }
    },

    // Inicializa todas las bases de datos cargando los JSON iniciales
    init: async function() {
        const dbs = ['c_r_o', 'jujutsu_kaisen', 'pacific_rim', 'cine', 'universoheroes', 'batman'];
        for (const dbName of dbs) {
            // Si la base de datos local de 'cine' contiene películas viejas/incorrectas (como Pacific Rim) o está vacía (por fallos de fetch local), la borramos para recargarla.
            if (dbName === 'cine') {
                const tempDb = this.loadDb('cine');
                if (tempDb && (!tempDb.peliculas || tempDb.peliculas.length === 0 || tempDb.peliculas.some(p => p.Titulo === 'Pacific Rim'))) {
                    localStorage.removeItem('db_cine');
                }
            }

            if (!this.loadDb(dbName)) {
                try {
                    // Intentar cargar datos del JSON correspondiente de la carpeta data/
                    let response = await fetch(`./data/${dbName}.json`);
                    
                    // Si falla, buscar en la raíz por si se subió sin la carpeta data/
                    if (!response.ok) {
                        response = await fetch(`./${dbName}.json`);
                    }

                    if (response.ok) {
                        const data = await response.json();
                        this.saveDb(dbName, data);
                        console.log(`Base de datos [${dbName}] inicializada correctamente.`);
                    } else {
                        // Si falla la carga, usar la estructura por defecto
                        this.saveDb(dbName, this.getFallback(dbName));
                        console.warn(`Archivo JSON de [${dbName}] no encontrado. Se usó el fallback por defecto.`);
                    }
                } catch (e) {
                    console.error(`Error al inicializar la base de datos [${dbName}]:`, e);
                    this.saveDb(dbName, this.getFallback(dbName));
                }
            }
        }
    }
};

// Crear una promesa que se resuelva cuando la base de datos esté lista
db.ready = db.init();
