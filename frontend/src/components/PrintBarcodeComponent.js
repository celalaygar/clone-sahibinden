import React from 'react'
import { BACKEND_BARCODE_LINK } from '../constant/GlobalConstant';

const PrintBarcodeComponent = (props) => {

    const { barcode} = props;
    let source = barcode;
    const openNewWindow = (event, url,fileName) => {

        // save image as a file

        // var element = document.createElement("a");
        // var file = new Blob(  [  url ], { type: "image/*" } );
        // element.href = URL.createObjectURL(file);
        // element.download = fileName;
        // element.click();

        //event.preventDefault();


        // trigger writer
        // window.print()


        // open new windows for current image
        window.open(url)
        // setTimeout(
        //     () => {
        //       console.log('Hello after 2 seconds');
        //     },
        //     2 * 1000
        //   );
        // window.print()
    }
    
    return (
        // <button type="button" onClick={e => openNewWindow(e, BACKEND_BARCODE_LINK + source + ".png", source + ".png")}>
            <img
             onClick={e => openNewWindow(e, BACKEND_BARCODE_LINK + source + ".png", source + ".png")}
                //style={{width:'570px', height: '220px'}}
                //  className= "m-2"
                // width={500} 
                // height={190}
                src={BACKEND_BARCODE_LINK + source + ".png"} 
                alt="deneme" 
            />
        // </button>
    )
}

export default PrintBarcodeComponent