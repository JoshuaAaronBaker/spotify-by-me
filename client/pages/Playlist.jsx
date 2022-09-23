import React from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './playlist.css';

const millisToMinutesAndSeconds = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
};

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playlist: {},
      playlistItems: {}
    };
  }

  componentDidMount() {
    Promise.all([
      axios.get(`/playlists/${this.props.playlistId}`)
        .then(res => res.data),
      axios.get(`/playlists/${this.props.playlistId}/tracks`)
        .then(res => res.data)
    ]).then(([playlist, playlistItems]) => this.setState({ playlist, playlistItems, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <>
      <div className="container gradient hide-mobile">
        <div>
          <Navbar />
        </div>
          <div className="row wrap center-header-image header-padding">
            <div><img className='playlist-header-image' src={this.state.playlist.images[0].url} alt="" /></div>
            <div className='header-des-padding'><h2>{this.state.playlist.name}</h2>
              <h4>{this.state.playlist.description}</h4></div>
        </div>
        <div className="row">
          <table>
              <th className='mobile-table'></th>
              <th className='mobile-table'></th>
              <th className='mobile-table'></th>
            <tr>
                <th className='mobile-table'>#</th>
                <th className='mobile-table'>TITLE</th>
            </tr>
              {this.state.playlistItems.items.map((track, index) =>
                <tr key={track.id}>
                  <td className='mobile-table'>
                    {index + 1}
                  </td>
                  <td className='flex-col mobile-table'>
                    <img className='tracklist-image title-padding' src={this.state.playlistItems.items[index].track.album.images[0].url} alt="" />
                    <div>
                      <p className='song-name p-margin'>{track.track.name}</p>
                      <p className='artist-name p-margin'>{track.track.artists[0].name}</p>
                    </div>
                  </td>
                  <td className='mobile-table'>
                    <p>{track.track.album.name}</p>
                  </td>
                  <td className='mobile-table'>
                    <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
                  </td>
                </tr>)}
          </table>
        </div>
      </div>

      <div className="container gradient hidden">
        <div className="row">
          <div className="col-fourth">
            <Sidebar />
          </div>
          <div className="col-three-fourth">
            <div className="row wrap">
              <div className="header-margin">
                    <img className='playlist-header-image' src={this.state.playlist.images[0].url} alt="" />
                    <div className='des'>
                      <h2>{this.state.playlist.name}</h2>
                      <h4>{this.state.playlist.description}</h4>
                    </div>
                  </div>
                <table>
                  <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>TIME</th>
                  </tr>
                  {this.state.playlistItems.items.map((track, index) =>
                    <tr key={track.id}>
                    <td>
                      {index + 1}
                    </td>
                    <td className='flex-col'>
                        <img className='tracklist-image title-padding' src={this.state.playlistItems.items[index].track.album.images[0].url} alt="" />
                        <div>
                          <p className='song-name p-margin'>{track.track.name}</p>
                          <p className='artist-name p-margin'>{track.track.artists[0].name}</p>
                        </div>
                    </td>
                    <td>
                      <p>{track.track.album.name}</p>
                    </td>
                    <td>
                        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
                    </td>
                  </tr>)}
                </table>
              </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
