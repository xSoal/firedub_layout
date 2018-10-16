import $ from 'jquery';


let f = ( menuItem, width = window.innerWidth, height = window.innerHeight ) => {

// https://code.sololearn.com/WT8P3v0nIpFT/?ref=app#js

    if(window.innerWidth > 1000){
        let canvas = menuItem.querySelector('canvas');
        
        var ctx = canvas.getContext( "2d" );
        //Make the canvas occupy the full page
        var W = width,
            H = height;
        canvas.width = W;
        canvas.height = H;
        var particles = [];
        var Smokeparticles = [];
        //Lets create some particles now
        var particle_count = 350;
        var flamewidth = W/4;

    //     var ctx = canvas.getContext("2d");    
    // //Make the canvas occupy the full page
    //     var W = window.innerWidth, H = window.innerHeight;
    //     canvas.width = W;
    //     canvas.height = H;    
    //     var particles = [];
    //     var Smokeparticles = [];
    // //Lets create some particles now
    //     var particle_count = 450;
    //     var flamewidth = 350;


        for ( var i = 0; i < particle_count; i++ ) {
            particles.push( new particleFlame() );
        }

        function particleFlame() {
            //speed, life, location, life, colors
            //speed.x range = -2.5 to 2.5 
            //speed.y range = -15 to -5 to make it move upwards
            //lets change the Y speed to make it look like a flame
            this.speed = {
                x: -2.5 + Math.random() * 5,
                y: -15 + Math.random() * 10
            };
            var locmin = ( W / 2 ) - ( flamewidth / 2 );
            var locmax = ( W / 2 ) + ( flamewidth / 2 );
            this.location = {
                x: Math.random() * ( locmax - locmin ) + locmin,
                y: H
            };

            let radiusOwn = H/10;

            this.radius = Math.random() * ( radiusOwn - radiusOwn*2 ) + radiusOwn;
            //life range = 20-30
            this.life = 20 + Math.random() * 10;
            this.remaining_life = this.life;
            //colors
            this.r = '255';
            this.g = Math.round( Math.random() * ( 100 - 190 ) + 100 );
            this.b = Math.round( Math.random() * ( 10 - 30 ) + 10 );
        }

        function drawFlames() {
            //Painting the canvas black
            //Time for lighting magic
            //particles are painted with "lighter"
            //In the next frame the background is painted normally without blending to the 
            //previous frame
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "black";
            // ctx.fillStyle = '#fff';
            ctx.fillRect( 0, 0, W, H );
            ctx.globalCompositeOperation = "lighter";
            for ( var i = 0; i < particles.length; i++ ) {
                var p = particles[ i ];
                ctx.beginPath();
                //changing opacity according to the life.
                //opacity goes to 0 at the end of life of a particle
                p.opacity = Math.round( p.remaining_life / p.life * 100 ) / 100;
                //a gradient instead of white fill
                var gradient = ctx.createRadialGradient( p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius );
                gradient.addColorStop( 0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")" );
                gradient.addColorStop( 0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")" );
                gradient.addColorStop( 1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)" );
                ctx.fillStyle = gradient;
                ctx.arc( p.location.x, p.location.y, p.radius, Math.PI * 2, false );
                ctx.fill();
                //lets move the particles
                p.remaining_life--;
                p.radius--;
                p.radius--;
                p.location.x += p.speed.x;
                p.location.y += p.speed.y;
                //regenerate particles
                if ( p.remaining_life < 0 || p.radius < 0 ) {
                    //a brand new particle replacing the dead one
                    particles[ i ] = new particleFlame();
                }
            }

            // requestAnimationFrame(drawFlames);
        }

        // setInterval(drawFlames);
        // drawFlames();

        let interval;

        menuItem.addEventListener('mouseover', () => {
            $(canvas).show();
            interval = setInterval(drawFlames, 1000/60);
        });

        menuItem.addEventListener('mouseleave', () => {
            $(canvas).hide();
            clearInterval(interval);
        });      
        
    }


}
module.exports = f;