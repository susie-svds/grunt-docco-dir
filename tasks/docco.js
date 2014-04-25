// grunt-docco
// https://github.com/DavidSouther/grunt-docco
//
// Copyright (c) 2012 David Souther
// Licensed under the MIT license.

"use strict";
var docco = require( 'docco' ),
    grunt = require( "grunt" );

module.exports = function ( grunt ) {
    grunt.registerMultiTask( 'docco', 'Docco processor.', function () {
        var task = this,
            options, outputDir,
            fdone = 0,
            flength = this.files.length,
            done = this.async();

        options = task.options();
        outputDir = options.output;

        this.files.forEach( function ( file ) {
            // join 'args' and 'output' from options or file.dest according to docco.document() signature/first param

            file.src.forEach( function ( name ) {
                var out, opts, outdir;
                out = name.substring( name.lastIndexOf( "/" ) );

                outdir = outputDir + "/" + name.replace( out, "" ).replace( /\//g, "." );
                opts = {
                    args: [ name ],
                    output: outdir
                };
                //opts.output = outdir;
                //console.log( opts );
                //grunt.verbose.writeflags( opts, 'Options' );
                docco.document( opts, function () {
                    // done once all the file sets are processed
                    if ( ++fdone === flength ) {
                        done();
                    }
                } );
            } );
        } );
    } );
};