// grunt-docco
// https://github.com/joseph-jja/grunt-docco-dir
//
// Copyright (c) 2014 Joe Acosta
// Licensed under the MIT license.

"use strict";
var docco = require( 'docco' ),
    grunt = require( "grunt" ),
    path = require( "path" );

function finish( outdir ) {

    grunt.file.recurse( __dirname + path.sep + "../resources/default/", function ( abspath, rootdir, subdir, filename ) {

        var filepath = __dirname + "/../../../";

        if ( subdir && abspath ) {
            grunt.file.mkdir( outdir + "/" + subdir );
            grunt.file.copy( abspath, filepath + path.sep + outdir + path.sep + subdir + path.sep + filename );
        } else if ( abspath ) {
            grunt.file.copy( abspath, filepath + path.sep + outdir + path.sep + filename );
        }
    } );
}

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

                outdir = outputDir + path.sep + name.replace( out, "" ).replace( /\//g, "." );

                opts = {
                    args: [ name ],
                    output: outdir,
                    css: __dirname + path.sep + '../resources/default/docco.css',
                    template: __dirname + path.sep + '../resources/default/docco.jst'
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
                // we need to copy from the docco resource directory to 
                // the correct place, docco seems to fail at this
            } );
            finish( outputDir );
        } );
    } );
};