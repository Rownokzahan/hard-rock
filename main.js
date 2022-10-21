function getLyrics(){
    fetch(`https://api.lyrics.ovh/v1/Adele/Hello`)// the link does not work
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
    })
}
getLyrics();

function loadSongList(searchName){
    fetch(`https://api.lyrics.ovh/suggest/${searchName}`)
    .then(response=>response.json())
    .then(allData=>{   
        const songList = document.getElementById('song-list');
        songList.innerHTML="";   
        for (let i = 0; i < 10; i++) {  
            const title = allData.data[i].album.title;
            const artist =allData.data[i].artist.name;
            const song = document.createElement('div');
            song.innerHTML=`<div class="search-result col-md-8 mx-auto py-4">
                            <div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${title}</h3>
                                    <p class="author lead">Album by <span>${artist}</span></p>
                                    <audio controls>
                                        <source src="${allData.data[i].preview}" type="audio/ogg">
                                    </audio>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                    <button onclick="getLyrics(${title},${artist})" class="btn btn-success">Get Lyrics</button>
                                </div>
                            </div>
                            </div>`;
            songList.appendChild(song);                        
              
        }
    });
}

document.getElementById('search-btn').addEventListener('click',function(){
    const searchName = document.getElementById('search-box').value;
    loadSongList(searchName);    
});


