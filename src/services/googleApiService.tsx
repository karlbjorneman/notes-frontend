export function getPhotoAlbums(accessToken: string) : Promise<any[]> {
    return fetch('https://photoslibrary.googleapis.com/v1/albums', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + accessToken
        },       
        method: 'GET',
        mode: 'cors'
    })
    .then((res:any) => {
        return res.json();
    })
    .then(data => {
        return data.albums;
    })
    .catch((error:any) => {
      console.error('error')
    });
}

export function createPhotoAlbum(newAlbum: any, accessToken: string) : Promise<any> {
    return fetch('https://photoslibrary.googleapis.com/v1/albums', {
        body: JSON.stringify(newAlbum),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + accessToken
        },       
        method: 'POST',
        mode: 'cors'
    })
    .then((res:any) => {
        return res.json();
    })
}