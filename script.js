$(function () {
    (function () {
        var grid = 36,
            half = (grid / 2),
            count = 0,
            el, number, value, matchVal = [];
        var width = (1070 / Math.sqrt(grid)) - (1 * Math.sqrt(grid));
        var height = width;
        var parent = $('.container');
        var result = [],
            n, localStorageArray = [],
            previousItem;
        for (var i = 1; i <= half; i++) {
            result.push(i, i);
        }
        // suffle array
        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        // end array suffle
        var arr = shuffle(result);
        //console.log(arr);
        for (var i = 0; i < grid; i++) {
            var div = $(
                `<div class="col" style="width: ${width}px; height:${height}px;">
                    <a class="clicked" href="javascript:void(0)">Click Me</a>
                    <div class="number" data-number="${i}">${arr[i]}</div>
                </div>`
            );
            parent.append(div);
        }
        var checklocal = ((previousItem, localStorageArray) => {
            for (var i = 0; i < localStorageArray.length; i++) {
                if (previousItem.next().text() == localStorage.getItem(localStorageArray[i])) {
                    return true;
                }
            }
            return false;
        });
        parent.delegate('.col', 'click', function (event) {
            var self = $(event.target);
            if (self.hasClass('clicked')) {
                self.next().show();
                self.hide();
                el = self.next();
                if (value == el.text() && previousItem) {
                    if (index < el.attr('data-number')) {
                        localStorage.setItem(index, value);
                        localStorageArray.push(index);
                    } else {
                        localStorage.setItem(el.attr('data-number'), value);
                        localStorageArray.push(el.attr('data-number'));
                    }
                } else {
                    if (previousItem !== undefined && checklocal(previousItem, localStorageArray) == false) {
                        previousItem.show();
                        previousItem.next().hide();
                    }
                }
                value = el.text();

                index = el.attr('data-number');
                previousItem = self;
                count++;
            }
            console.log(localStorageArray.length);
            if (localStorageArray.length == (grid / 2)) {
                parent.append(`<p>You have own the game. Total number of clicked ${count}.</p>`);
            }
        });

    $('.reset').on('click', function(){
        localStorage.clear();
        $('a.clicked').removeAttr('style');
        $('div.number').removeAttr('style');
    });
    })();
});