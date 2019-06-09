// this was made to make html console log system easier.  it's insignificant but does output dev data.


// requires element to exist:
const dbo = document.getElementById('debugoutput');

const clogsettings = {
    verbose: true,
    html: false,
}

const clog = function (msg) {

    if (clogsettings.verbose) {
        console.log(msg);
    }

    if (clogsettings.html) {
        dbo.innerHTML = msg;
    }

}

clog('_clog.js');