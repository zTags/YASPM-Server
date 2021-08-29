
use std::convert::Infallible;
use std::env;
use std::fs;
use std::io;
use std::path::PathBuf;

use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Request, Response, Server};
use hyper::{Method, StatusCode};

fn inner_main() -> io::Result<PathBuf> {
    let mut dir = env::current_exe()?;
    dir.pop();
    Ok(dir)
}

async fn run(req: Request<Body>) -> Result<Response<Body>, Infallible> {
    let mut response = Response::new(Body::empty());

    if req.method() != Method::GET {
        *response.status_mut() = StatusCode::FORBIDDEN;
    } else {
        let path = req.uri().path();

        if path.starts_with("/lib/") {
            // test further for what the client specifially wants
            if path.starts_with("/lib/dependencies"){
                // return dependencies
                let libname = &path[18..];
                println!("request for dependencies of: {}", libname);
                // check if lib exists
                let mut path = inner_main().expect("error getting the directory the exe resides in.");
                path.push("libs");
                path.push(libname);
                path.push("dependencies.json");

                *response.body_mut() = Body::from(fs::read_to_string(path).expect("error reading file."));
                *response.status_mut() = StatusCode::OK;

            } else {
                let libname = &path[5..];
                println!("request for lib: {}", libname);
                // get lib
                let mut path = inner_main().expect("error getting the directory the exe resides in.");
                path.push("libs");
                path.push(libname);
                path.push("lib.spwn");
                
                *response.body_mut() = Body::from(fs::read_to_string(path).expect("error reading file."));
                *response.status_mut() = StatusCode::OK;
                                
            }

        } else if path == "/" {
            *response.body_mut() = Body::from("Welcome to PCKP!");

        } else {
            // return 404
            *response.status_mut() =  StatusCode::NOT_FOUND;
        }
    }



    Ok(response)
}


#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {

    // For every connection, we must make a `Service` to handle all
    // incoming HTTP requests on said connection.
    let make_svc = make_service_fn(|_conn| {
        // This is the `Service` that will handle the connection.
        // `service_fn` is a helper to convert a function that
        // returns a Response into a `Service`.
        async { Ok::<_, Infallible>(service_fn(run)) }
    });

    let addr = ([127, 0, 0, 1], 3000).into();

    let server = Server::bind(&addr).serve(make_svc);

    println!("Listening on http://{}", addr);

    server.await?;

    Ok(())

}