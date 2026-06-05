const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

buscarMusica("bad bunny");

async function buscarMusica(texto){

    try{

        const respuesta = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(texto)}&entity=song&limit=24`
        );

        const datos = await respuesta.json();

        const canciones = datos.results.filter(
            cancion =>
                cancion.trackName &&
                cancion.previewUrl &&
                cancion.artworkUrl100
        );

        mostrarCanciones(canciones);

    }catch(error){

        main.innerHTML = `
            <h2 class="no-results">
                Error al cargar canciones
            </h2>
        `;
    }
}

function mostrarCanciones(canciones){

    main.innerHTML = "";

    if(canciones.length === 0){

        main.innerHTML = `
            <h2 class="no-results">
                No se encontraron canciones 🎵
            </h2>
        `;

        return;
    }

    canciones.forEach(cancion => {

        const fecha = cancion.releaseDate
            ? cancion.releaseDate.split("T")[0]
            : "No disponible";

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("song");

        tarjeta.innerHTML = `
            <img src="${cancion.artworkUrl100.replace('100x100','600x600')}">

            <div class="info">

                <h3>${cancion.trackName}</h3>

                <p>🎤 ${cancion.artistName}</p>

                <p>💿 ${cancion.collectionName}</p>

                <p>🎶 ${cancion.primaryGenreName}</p>

                <small>📅 ${fecha}</small>

            </div>

            <audio controls>
                <source src="${cancion.previewUrl}" type="audio/mpeg">
            </audio>
        `;

        main.appendChild(tarjeta);
    });

    const audios = document.querySelectorAll("audio");

    audios.forEach(audio => {

        audio.addEventListener("play", () => {

            audios.forEach(a => {

                if(a !== audio){
                    a.pause();
                }

            });

        });

    });

}

form.addEventListener("submit", e => {

    e.preventDefault();

    const termino = search.value.trim();

    if(termino){
        buscarMusica(termino);
    }

});