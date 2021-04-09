import React, {Component} from 'react';

class Songs extends Component {
    constructor(){
        super()
        this.state ={
            songs: []
        }
    } 

    componentDidMount() {
        this.getAllSongs()
    } 

    getAllSongs = () => {
        
        fetch('https://ec2-34-201-125-164.compute-1.amazonaws.com:3030/songs', {method: 'GET'})
        .then(res => res.json())
        .then(res => this.setState({songs: res}))
        .catch((error) => console.log(error))
    }

    updateChange = (e) => {
        console.log([e.target.name], e.target.value)
        this.setState({[e.target.name]: e.target.value})

    }

    addSong = () => {
        let newSong ={
            song_name: this.state.songName,
            downloads: this.state.downloads
        }
        fetch('http://localhost:3030/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong)
        })
        .then(this.getAllSongs)
        .catch(error => console.log(error))
    } 

    render(){
        console.log(this.state)
        return (
            <div>
                <h1>Add Songs:</h1>
                <label>Song Name:</label>
                <input name='songName' onChange={this.updateChange}></input>
                <label>Downloads:</label>
                <input name='downloads' onChange={this.updateChange}></input>
                <button onClick={this.addSong}>Submit</button>
                {this.state.songs.map(song => <h1 key={song.id}>{song.song_name}</h1>)}
            </div>
        )
    }
}

export default Songs