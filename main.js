'use strict';
var currwine = 'bordeaux-style_red_blend';

var lineOptions = {
    chart: {
        renderTo: 'line-chart',
        type: 'spline',
        backgroundColor: 'transparent'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: 'Median price per rating',
        style: {
            color: '#ffffff',
            fontSize: 14
        }
    },
    xAxis: {
        categories: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
                    96, 97, 98, 99, 100],
        labels: {
            style: {
                color: '#ffffff'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Price [$]',
            style: {
                color: '#ffffff'
            }
        },
        labels: {
            style: {
                color: '#ffffff'
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true,
        pointFormat: 'Median price for this rating: ${point.y}'
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    legend: {
        enabled: false
    },
    series: []
}
var bubbleOptions = {
    chart: {
        renderTo: 'bubble-chart',
        type: 'packedbubble',
        backgroundColor: 'transparent'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: 'Importance of words in wine review',
        style: {
            color: '#ffffff',
            fontSize: 14
        }
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> <br> Frequency Score: {point.value:.3f}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '10%',
            maxSize: '80%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 0
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    legend: {
        enabled: false
    },
    series: []
};

var barOptions = {
    chart: {
        renderTo: 'bar-chart',
        type: 'column',
        backgroundColor: 'transparent'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: 'Most popular vintage per rating',
        style: {
            color: '#ffffff',
            fontSize: 14
        }
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                color: '#ffffff'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Age [years]',
            style: {
                color: '#ffffff'
            }
        },
        labels: {
            style: {
                color: '#ffffff'
            }
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Most common age for this rating: <b>{point.y}</b>'
    },
    series: []
}

var mapOptions = {
    chart: {
        renderTo: 'map-chart',
        map: 'custom/world',
        backgroundColor: 'transparent'
    },

    title: {
        text: ''
    },

    subtitle: {
        text: 'Location and associated average rating',
        style: {
            color: '#ffffff',
            fontSize: 14
        }
    },

    mapNavigation: {
        enabled: true
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b><br>Rating: {point.rating:.2f}'
    },

    legend: {
        enabled: false,
    },

    series: [{
        // Use the gb-all map with no data as a basemap
        name: 'Basemap',
        borderColor: '#A0A0A0',
        nullColor:  '#f5f5dc',
        showInLegend: false
    }, 
    {
        name: 'Separators',
        type: 'mapline',
        nullColor: '#707070',
        showInLegend: false,
        enableMouseTracking: false
    }, 
    {
        // Specify points using lat/lon
        type: 'mappoint',
        name: 'Locations',
        data: []
    }]
}

var nameMap = {
    'pinot_noir': 'Pinot Noir',
    'chardonnay': 'Chardonnay',
    'cabernet_sauvignon': 'Cabernet Sauvignon',
    'red_blend': 'Red Blend',
    'bordeaux-style_red_blend': 'Bordeaux-style Red Blend',
    'riesling': 'Riesling',
    'sauvignon_blanc': 'Sauvignon Blanc',
    'syrah': 'Syrah',
    'rose': 'Rosé',
    'merlot': 'Merlot',
    'nebbiolo': 'Nebbiolo',
    'zinfandel': 'Zinfandel',
    'sangiovese': 'Sangiovese',
    'malbec': 'Malbec',
    'portuguese_red': 'Portuguese Red',
    'white_blend': 'White Blend',
    'sparkling_blend': 'Sparkling Blend',
    'tempranillo': 'Tempranillo',
    'rhone-style_red_blend': 'Rhône-style Red Blend',
    'pinot_gris': 'Pinot Gris'
}

/**
 * Load data and render charts.
 * @param {wine variety} wine 
 * @param {chart render function} callback 
 */
function loadAndRenderData(wine) {
    var fp = wine + '.json';
    var bubbleData = 'assets/bubble_charts/' + fp;
    var mapData = 'assets/map_charts/' + fp;
    var barData = 'assets/bar_charts/' + fp;
    var lineData = 'assets/line_charts/' + fp;
    loadData(bubbleData, renderBubbleChart);
    loadData(mapData, renderMapChart);
    loadData(barData, renderBarChart);
    loadData(lineData, renderLineChart);
    document.querySelector('#banner').innerHTML = nameMap[wine];
}

function loadData(filePath, callback) {
    $.getJSON(filePath, function(data) {
        callback(data);
    });
};

function renderBubbleChart(json) {
    bubbleOptions.series = [json];
    Highcharts.chart(bubbleOptions);
};

function renderMapChart(json) {
    mapOptions.series[2].data = json.data;
    Highcharts.mapChart(mapOptions)
};

function renderLineChart(json) {
    lineOptions.series = [json];
    Highcharts.chart(lineOptions);
}

function renderBarChart(json) {
    barOptions.series = [json];
    Highcharts.chart(barOptions);
}

document.addEventListener('DOMContentLoaded', function () {

  // Dropdowns

  var $dropdowns = getAll('.dropdown:not(.is-hoverable)');

  if ($dropdowns.length > 0) {
    $dropdowns.forEach(function ($el) {
      $el.addEventListener('click', function (event) {
        event.stopPropagation();
        $el.classList.toggle('is-active');
      });
    });

    document.addEventListener('click', function (event) {
      closeDropdowns();
    });
  }

  function closeDropdowns() {
    $dropdowns.forEach(function ($el) {
      $el.classList.remove('is-active');
    });
  }

  // Close dropdowns if ESC pressed
  document.addEventListener('keydown', function (event) {
    var e = event || window.event;
    if (e.keyCode === 27) {
      closeDropdowns();
    }
  });

  // Functions

  function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
  }

  loadAndRenderData(currwine);
});

function chooseWine(fileName, text) {
    loadAndRenderData(fileName);
    currwine = fileName;
    document.querySelector('#dropdown-text').innerHTML = text;
}