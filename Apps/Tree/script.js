$(document).ready(function() {
        if ($('.treeview').length) {
            //atribui a primeira lista não ordenada que estiver dentro do div
            //com a classe treeview, pois é a árvore
            var $tree = $('.treeview ul:first');
            $tree.attr({
                'role': 'tree'
            });
            //variáveis que mantém o controle sobre os nós expandidos ou contraídos da árvore
            var $allNodes = $('li:visible', $tree); //lista de nós visíveis da árvore
            var lastNodeIdx = $allNodes.length - 1; //o índice do último nó visível da lista
            var $lastNode = $allNodes.eq(lastNodeIdx); //último nó visível da lista
            //expande ou contrai um grupo de nós
            function toggleGroup($node) {
                $toggle = $('> div', $node);
                $childList = $('> ul', $node);
                //expande ou contraí os nós do grupo com efeito visual slide
                $childList.slideToggle('fast', function() {
                    //atualiza as variáveis de controle sobre os nós expandidos ou contraídos
                    $allNodes = $('li:visible', $tree);
                    lastNodeIdx = $allNodes.length - 1;
                    $lastNode = $allNodes.eq(lastNodeIdx);
                });
                //ajuste de estilo e propriedades wai-aria da contração ou expansão do grupo
                if ($toggle.hasClass('collapsed')) {
                    //ajuste de estilo visual para expandido
                    $toggle.removeClass('collapsed').addClass('expanded');
                    //indica que um elemento está expandido (semanticamente e não visualmente)
                    $('> a', $node).attr({
                        'aria-expanded': 'true',
                        'tabindex': '0'
                    }).focus();
                } else {
                    //ajuste de estilo visual para contraído
                    $toggle.removeClass('expanded').addClass('collapsed');
                    //indica que um elemento está contraído (semanticamente e não visualmente)
                    $('> a', $node).attr({
                        'aria-expanded': 'false',
                        'tabindex': '0'
                    }).focus();
                }
            }
            //obtém o próximo nó da árvore
            function nextNodeLink($el, dir) {
                var thisNodeIdx = $allNodes.index($el.parent());
                if (dir == 'up' || dir == 'parent') {
                    var endNodeIdx = 0;
                    var operand = -1;
                } else {
                    var endNodeIdx = lastNodeIdx;
                    var operand = 1;
                }
                if (thisNodeIdx == endNodeIdx) {
                    //se o nós atual for o último
                    return false; //não faz nada
                }
                if (dir == 'parent') {
                    var parentNodeIdx = $allNodes.index($el.parent().parent().parent());
                    var $nextEl = $('> a', $allNodes.eq(parentNodeIdx));
                } else {
                    var $nextEl = $('> a', $allNodes.eq(thisNodeIdx + operand));
                }
                $el.attr('tabindex', '-1');
                $nextEl.attr('tabindex', '0').focus();
            }
            //para cada link que houver na árvore
            $('li > a', $tree).each(function() {
                var $el = $(this);
                var $node = $el.parent();
                $el.attr({
                    'role': 'treeitem',
                    'aria-selected': 'false',
                    'tabindex': "-1",
                    'aria-label': $el.text()
                });
                $node.attr('role', 'presentation');
                //se o nó tem nós filhos
                if ($node.has('ul').length) {
                    $node.addClass('hasChildren');
                    $childList = $('ul', $node);
                    $childList.attr({
                        'role': 'group'
                    }).hide();
                    //adiciona o elemento para expandir/contrair e define
                    //aria-expanded no link
                    $('<div aria-hidden="true" class="toggle collapsed">').insertBefore($el);
                    $el.attr('aria-expanded', 'false');
                } else {
                    //caso o nó não tenha nós filhos
                    $node.addClass('noChildren');
                }
                //define os eventos de teclado
                $el.on('keydown', function(e) {
                        if (!(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) {
                            switch (e.which) {
                                case 38: //cima
                                    e.preventDefault();
                                    nextNodeLink($(this), 'up');
                                    break;
                                case 40: //baixo
                                    e.preventDefault();
                                    nextNodeLink($(this), 'down');
                                    break;
                                case 37: //esquerda
                                    if ($(this).attr('aria-expanded') == 'false' || $node.is('.noChildren')) {
                                        nextNodeLink($(this), 'parent');
                                    } else {
                                        toggleGroup($node);
                                    }
                                    break;
                                case 39: //direita
                                    if ($(this).attr('aria-expanded') == 'true') {
                                        nextNodeLink($(this), 'down');
                                    } else {
                                        toggleGroup($node);
                                    }
                                    break;
                            }
                        }
                    }
                    //atualiza aria-selected quando o estado de foco de um nós muda
                ).on('focus', function() {
                    $('[aria-selected="true"]', $tree).attr('aria-selected', 'false');
                    $(this).attr('aria-selected', 'true');
                });
            });
            //define tabindex="0" no primeiro link da árvore
            $('> li:first > a', $tree).attr('tabindex', '0');
            //adiciona evento click e estilo hover sobre o elemento com classe toggle
            $('.toggle').on('click', function() {
                toggleGroup($(this).parent());
            }).hover(function() {
                $(this).toggleClass('hover');
            });
        }
    }

);