import fetch from 'isomorphic-fetch';

//////////////////////
// picture actions //
/////////////////////

// Get album from db

// Post new profile picture to db

export const UPDATE_PIC = 'UPDATE_PIC';

export function updatePic(image_url, user_id) {

  return function(dispatch) {
    
    dispatch(requestPic());

    let request = new Request(`/api/users/${user_id}/pictures`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_url:  image_url})
    });

    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivePic(json));
      });
  };
}

export const UPDATE_ALBUM = 'UPDATE_ALBUM';

export function updateAlbum(image_url, user_id) {

  return function(dispatch) {
    dispatch(postAlbum());

    let request = new Request(`/api/users/${user_id}/album`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_url:  image_url})
    });

    return fetch(request)
    .then(response => console.log('image posted to album', response));
  };
}

export const GET_ALBUM = 'GET_ALBUM';

export function getAlbum(user_id) {
  return function(dispatch) {
    dispatch(requestAlbum());
    let request = new Request(`/api/users/${user_id}/album`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    return fetch(request)
      .then(response => response.json())
      .then((json) => {

        dispatch(receiveAlbum(json));
      });
  };
}

export function postPicture(user_id, image) {

  return function(dispatch) {
    dispatch(postPic());
    let formData = new FormData();
    formData.append('type', 'base64');
    // image = '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…/qB6GvlqTVSabPr8VL2MbVI2Xc+XPEGsT+IfEVzdmUsrtsXPZaLSARXKK7YJ4+bpSReHrzSdRmtL+3e3khba6N1zWheTRkBVj8xhwoFfdUbOCUdj53SN2zV1XWY/D1okMBBu5FzgfwiuXWS5uXLZ+8eufWrH2UzSmWVizk/NuPP0rUsmhgIIGTj0rVRkg0kybRdKPnRM4HJzXVzzxramBnEce3bgkcVy0+teUuyHaJH6v8A3cVU8/7RLud3diN2cUSatY3jFpaG099bwxeXHmQL8gY9z2qzbX7TMsjkM+MAVnrPGVVTG2OCFyAM5q3C8UcmBFwOODXmVabfoOUJM6S2nZ41Qv1OSR27V0Oh3skSqpG+PPp096ytMs7WaFXVt3fB61t2cxiyqoFUcdORVRjyRVhxw82tTsbVX8hSOSehHHFbdm2ACzD2Ga5jRrlkIDEsvXk11EFtujEgXch4yOxqpeZyVqMos6XRbo20sbbfMCncUJ9K9c0a5t9fgEkLjziMsrdvY14pp4JbG6ur0S7eznR4n2MDzjvXn16UZ+pywrOm7H0J4KtjBp0h27S8mOenHeugYIMZOCRXN+BfEsWu6UkYUJcwrh09vUVsXuoJayhCP4QelfNyh+9aZyzluz8KPiR49uNe1SWBcqjsrOo7egz9Kl+Evw3u/HeuxwRr5dnGS00zdAM+tYvh3wtc+L/EUNlaoZXdhuI7Z6nNe0fEDxha/CTw5B4U8NbTqk6gTyRjLEnr+NfRvRaFVqspS5erLvxU+K8fgvSYfAfgpgWlTyriSPksT1ANL4M+Ey+F/C/9o380h1G4TdIqnBAPY1v/AAi/Zc1uw0lfFOrt/wATi4TzYYZRny/c+9bnivwnqGnaJc3WoalI0kSsxxwMDtXwmY5pTrVVh6Mtnr5n1uVYKGGXtqzVz5+8U64lp4ljhiO1IFGc9Tmv0c/YX1Ww174eQztErajYztbeYTzsPzD9a/KifxENb8R3FxIVwSUT6DpX3P8A8E6/Hn2fxdqGhSynZdxLJGo/vKea+29nJ5e6XazPDxlZV6s5X6n6I6rYxanpt3ZTKHhuIXhcHuGBB/nX4w2F5L8Kf2iJd+6KO21MxyD/AGd5Br9qclT0wPavzF/at+GenjxZ8Qb6CER6tp2qLdiQdTFIokx+bfpXh4OuqVRX62X3nnKn7SLj5fkfW/wxv4rb4g2ssRHk30XykdDvXNec/wDBR/wKNU8CaT4gijDTWkphkIA+4VY/zqx8Bte/tvw34S1hX3tEkKOe/wDdNe3/ALS/hOPxl8FPE9kyeYy2rzJgc5VSeK9jN04VYVDx8E/ij5n4pfYjaW8m/wD1khKIP9n1qK0so4eWbCg4BPOafrVz5V/KsrEPGdgHTABwax7rVmYAI20enevThU93Q9qKVzcvdYjskbysJ6Jjg1zl9q0l0SSSoJ/OqUszSMS3zH1NR+ZvPPB9qTkzS/YWRsjkH86aBkBs4obOPWhWwADUMCUZ2qSfyo27j3AHekUgqRj86eM5OMn2qTVChc8c0K27jAwPWljgdyNqkn2qQWkwcAoQT3qLmqTITyBxg+tMxlic5qVkZeWB4PpSEgA+3emmDRF7joPSpUk4AOT71EV+UnPBpucMMHFPcm9iwTwcHP4UmMrxzxSLISpHY0iOOR096RWjHBcLjNPU46k/hUY4GfenqRgg8570CdiVfmHXB6807eCSc4NQg8cdT3p6MO/NBSdiQH0FPEhBAJ4quWIG79BQZeAM4zTSu7GU5W2LbTYHHJ+lJCcv2+tVVJUg7uPerUToFwygk9x2rrhFRRwzqSluaECELkdPWte2xsQnNZNsBJGV35HbFa1tDuT7xb09q1W5ka0EBIyoB45z2ra062WRhxuIHArI09WTIY7eMcnrXRaXLbwxo0jYG3Ix1rTfYnY6jQdOFkisqMxcgDBwRXZW0uHUjOE+XA71y/g6SbWb4vGuI4ycA9hiuu+wSQqSQeTwfWvCzSaSjTPsOH6N3Kqy8j+am4DP0rpPB3jq88M3yKsjy26t80J6Vy9jiNiDgZHGeaRsidlTcCTnmvn4+7sfX1qcaicJ6ns/ifwx4b+Neg3BiVbXW0jLQzxja24dA3qK+NNbsdS0HU57C7UwXMDlHQDv65r3/wAO38+n6jDLFM0WxwGKHAI75rz340a/Y+J/G1xcWEakLGsTSY++w617+Arzk+XofJYnBKjO8djzhZZwN24txjnvV2KSTyuJMjv6CnLbZKYQgDIPNPFuytyuz1x3r3lJvqcns0noLDHv3cZGOD6/Srlum35jkcY6802BW2HaSBxgYq3DG0aEkAE8jvzXSo3N4plm3XeiEYPqa0rRF2jIAzg5rNgBPQgE8kCtCAFT8oJB59QKUot6GrNzR5jFJvQ4xwwBzkV1FvKsxDQ5VTyxNcbbE8FTtjXAOB0+tdf4ckW5ISUAIflye1c8o8prCfRm/p05WREZeMcH1r0PwnN5yNGTlWGMVwt1pc2lGPzcMjDMci9CK6LwrfKtyqltoxms5xcldGdWN0dvZaX9olkWLClAWKnjIq7bK9u3KleetQWl9DYQXd3NkpHDkgD/AGqzU8Xy3bqI4xHCD91uSR9a8/njFO54dakkrnonhfWrjS7hJYJDGwP5+xrtpfG8t4wkkVA+MfWvN9NlEqR/KY3YZEbDt61sIflGTg1j7OMpcx5UttT87Um034B+DhcAJceKbxNkCS9UzwSfQCqn7Ovwu1Px747i8Wa1BJPZxSGX5hwzdR19OOleceD4rr4u/Ei2/tG5OJ5lVt3O1M8gV+h8L2Hw88C2trYWaAhhEjKoXjjk18txHmEsNRdKlo2fTZLl8Z/7RVd29jO8RfFmF/EkemRqY9qhBGvGT0ryX9qPxvb+Gfh/Mm4Nd3o8iNQRnJ6muD/aF8Wz+B/GtlqqJ50lzH8qhsbSOpr5t+InxL1f4i6nFc6nMzJEu2KIfdQdz9a+ZyXJHiatLFN6bs9nNsVRw9NKD963Y5mJirZyQR3Ar6T/AGPPiBZeFPif4euL3VI7GY3Swst2gWN4z6Sdj9a+aUcMARkD0q9HNJFAU4wxHI6/nX65JXjZH58pO9z+iGG4juIllicSRsAwdTkMD3Br4p/apt49L+MuuCSHEWr+G1lyy/I7oXU49TgLXz5+yx+3f4q+HE+jeFNfhbxJ4beVLWIs+Lm2BIA2MeoGehr6N/4KAo32bwVrFs5hFzb3Vuw/i2siuPy/rXyc8LKFTkfU6qc/ZyT6Fz9lvw3PY/B/wzqfyvZ3xCZA5Qh+M/lX1rrVkNT0O/tCoIntmjwe+VxXz1+xLIviH9l7Q4ZF4inlQFjk5WQHNfSYUBCB0Bxz7V2ZhiPapQe6PNo0VTqSktmfgj8atBbwx8Stf0918swXk0ePYOf8a8/kbBBJNfTH7enhyHw5+0F4jaI5W4dbogdi4OR/47XzS6ZI5Jz616mFlzUkzvsRE7uR0oBwaexAJAHIpm3e+D+ldRaVgClu9Tpbggg5JxUceEOPwrRs4jOwy2PehRuF0Qw2wYBT075rTtLeFJCAAQOpq6bGK2ikJXcdvWsAMTIOMk8ZJqnCxalY6CJo4RgFecjhvUVLcXVuDGxySR2GaybS1kO35gMnOK0JNJaIqQ45BqXFIqNSRoIunywgnaWPJyawdUsoI5wYcbTycGtceHVMIIk+bGSCOOlVp7BbFh5irLk46Vi0jXnkzAazwCQeOwNRyWjDDZyvYV0o0yG6BKbo2z9RVK50pot7FwcUIHoYhiZOwFCIxOQuQe1XiBuIGT9akt02vzg1VgUr7meEbspI+lOETt0GDW3GUCHC8Z5pssixMcAkEd6pQY3JIyorSUZ+U8+ppRaS/dCfWr9xPtVCBUElyWYkZBx1q1AyckRNDsYbjzioJcs3GMCpZJcIS3LEcGq8YPc5q4xtqYSmSRRgg5H0FWEUEjAqNEwpPeplYYB5zWxz9SxbZRsr8p9a2LacNtGNrHowrNt4yyKcjP0rQgjBC9uccVOzLsdBZszIpmQSAdwa9B8FeBm8UE+T5Zx1Bb9D6V5/pkxTKDlQOhFfSv7L1hEniGWULhJYjkdT3qa05Qp8yYo25rNHSeD/AAZpfhvw3LCYfP1CV/8AWISQExz+VdJb+HLbUdqCP5GUEgr0OO1el33hO0ima8tx5EqruUJwvuMe9b/hOOz8T2oiubOJbhcr5yKAeO9fLVnKtLmke3hsW6ELRPnTxT4TOgMsq/NGe7cbTXLeWzyDoT619V6p4GtbzULjT7oJNHsDAkGvIPHPgCLQJt8UimLdhVOcisOW259VgsdGurS3OBvG+w6LczMMyBDg5xz7V4+9mJJDKGy5O45HevU/iRIbSws7Vekpyx6cVwkFtkhuCvTBr6zLMMvZOb6kYyopNJGabKSRfY8HAxUr6cpGWGE4OO9bUFmHBPH0PSrQsVBQE5X0r2FRijjUeY5xLTaMbAELcDPNPNqwcbuB1ArpTYREhWXOeKqXGnqsnlE5zwD6V0RikKVNpGZAhcgdEz97A4q7EwwqKGyB/B0/KmSRCI7QTtQhfrmrEEYhZSQp8xSyjHT61pZGbslYuWcG7AYFmPfkAfWuw0TTzLLEryLCGIBLcVy8c/8AY1m1z5avI/yqB0HfJrR8KavLeymWf5pN24Edvxrzq8oxdluY1KipRa6n0PF4a83wdHMbV7+3jYK5Xhk/2gfauBa3NnqJVCSqNwQd1fWnwPsoNR+HqmWMNHcjDqwHpg188+NfDMfhvxffWCFJESQ7WxggHoK8ijV/eSps4MDinWTjPc09OVdV0maOYkI8QV8c5+aobPwtDES0V2uAeElTH6jP9Kr6UWtreXDEoWVcVsQnbKMEgYzVTppvU2qQUrnafDbSbq58XaWlxAZIo33F925dqjNena18N7e81CSa2k8iN+fLHQHviuQ+EbFvEcbE52wuf0r2C4vBA4XYDkZrw8VVlSqJRPEqQUZ2P//Z'
    formData.append('image', image);

    return fetch('https://api.imgur.com/3/upload.json', {
         method: 'POST',
         headers: {
             Accept: 'application/json',
             Authorization: 'Client-ID a447505b4d4e019'// imgur specific
         },
         body: formData
     })
    .then(function(response) {
      if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response);
      } else {
          return Promise.reject(new Error(response.statusText));
      }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      dispatch(updatePic(data.data.link, user_id));
      dispatch(updateAlbum(data.data.link, user_id));
    });
  };
}

///////////////////
// Network requests
///////////////////


// TARGET
export const POST_PIC = 'POST_PIC';
function postPic() {
  console.log("postPic");
  return {
    type: POST_PIC,
  };
}

export const POST_ALBUM = 'POST_ALBUM';
function postAlbum() {
  console.log("postAlbum");
  return {
    type: POST_ALBUM,
  };
}

export const REQUEST_PIC = 'REQUEST_PIC';
function requestPic() {
  console.log("requestPic");
  return {
    type: REQUEST_PIC,
  };
}

export const RECEIVE_PIC = 'RECEIVE_PIC';
function receivePic(json) {
  return {
    type: RECEIVE_PIC,
    imageUrl: json,
    receivedAt: Date.now()
  };
}

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
function requestAlbum() {
  return {
    type: REQUEST_ALBUM
  };
}

export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
function receiveAlbum(json) {
  return {
    type: RECEIVE_ALBUM,
    album: json,
    receivedAt: Date.now()
  };
}