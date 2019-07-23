class PieChart {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _colors: string[] = [];
    private _legend: HTMLDivElement;

    public constructor( elementId: string ) {
        this._canvas = document.getElementById( elementId ) as HTMLCanvasElement;
        this._context = this._canvas.getContext( "2d" );
        this._legend = document.getElementById( "chartLegend" ) as HTMLDivElement;
    }

    public drawData( labels: string[], values: number[] ): void {

        // Reset
        this._colors.length = 0;
        let total = 0;
        this._legend.innerHTML = "";
        this._context.clearRect( 0, 0, this._canvas.width, this._canvas.height );

        if ( labels.length !== values.length ) {
            throw new Error( "labels and value lengths must match!" );
        }

        // Track the total value and create randomized colors for each category.
        for ( let val of values ) {
            total += val;
            this._colors.push( this.getRandomColor() );
        }

        let angle = 0;
        let index = 0;

        for ( let value of values ) {

            // Get the final slice angle.
            let sliceAngle = 2 * Math.PI * value / total;

            let centerX = this._canvas.width / 2;
            let centerY = this._canvas.height / 2;
            let radius = Math.min( centerX, centerY );

            this._context.fillStyle = this._colors[index];
            this._context.beginPath();
            this._context.moveTo( centerX, centerY );
            this._context.arc( centerX, centerY, radius, angle, angle + sliceAngle );
            this._context.closePath();
            this._context.fill();

            // Add the legend entry, complete with label and percentage
            let labelText = labels[index];
            let percent = ( values[index] / total ) * 100;
            labelText += ` (${percent.toFixed( 2 )}%)`;

            let legendElement = document.createElement( "div" );
            legendElement.className = "legend-element";

            // Create and append the coloured block.
            let legendBlock = document.createElement( "span" );
            legendBlock.className = "legend-block";
            legendBlock.style.backgroundColor = this._colors[index];
            legendBlock.innerHTML = "&nbsp;";
            legendElement.appendChild( legendBlock );

            // Append the label
            legendElement.appendChild( document.createTextNode( labelText ) );

            this._legend.appendChild( legendElement );

            ++index;
            angle += sliceAngle;
        }
    }

    private getRandomColor(): string {
        let values = "0123456789ABCDEF";
        var colorStr = "#";
        for ( var i = 0; i < 6; i++ ) {
            colorStr += values[Math.floor( Math.random() * 16 )];
        }
        return colorStr;
    }
}

export { PieChart };