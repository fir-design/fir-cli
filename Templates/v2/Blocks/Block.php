<?php

namespace Fir\Pinecones\[CAMEL]\Blocks;

use Log1x\AcfComposer\Block;
use StoutLogic\AcfBuilder\FieldsBuilder;
use Fir\Lib\Utils\GlobalFields as GlobalFields;
use Fir\Lib\Utils\Helpers;
use Fir\Lib\Utils\Blocks;
use Fir\Lib\Utils\Images;

use function Roots\bundle;


class [CAMEL] extends Block
{
    /**
     * The block name.
     *
     * @var string
     */
    public $name = '[NAME]';

    /**
     * The block description.
     *
     * @var string
     */
    public $description = '[DESC]';

    /**
     * The block view.
     *
     * @var string
     */
    public $view = '[CAMEL].view';

    /**
     * The block category.
     *
     * @var string
     */
    public $category = 'fir/blocks';

    /**
     * The block icon.
     *
     * @var string|array
     */
    public $icon = 'editor-ul';

    /**
     * The block keywords.
     *
     * @var array
     */
    public $keywords = [];

    /**
     * The block post type allow list.
     *
     * @var array
     */
    public $post_types = [];

    /**
     * The parent block type allow list.
     *
     * @var array
     */
    public $parent = [];

    /**
     * The default block mode.
     *
     * @var string
     */
    public $mode = 'preview';

    /**
     * The default block alignment.
     *
     * @var string
     */
    public $align = '';

    /**
     * The default block text alignment.
     *
     * @var string
     */
    public $align_text = '';

    /**
     * The default block content alignment.
     *
     * @var string
     */
    public $align_content = '';

    /**
     * The supported block features.
     *
     * @var array
     */
    public $supports = [
        'align' => true,
        'align_text' => false,
        'align_content' => false,
        'full_height' => false,
        'anchor' => false,
        'mode' => false,
        'multiple' => true,
        'jsx' => true,
    ];

    /**
     * The block styles.
     *
     * @var array
     */
    public $styles = [
        [
            'name' => 'light',
            'label' => 'Light',
            'isDefault' => true,
        ],
        [
            'name' => 'dark',
            'label' => 'Dark'
        ]
    ];

    /**
     * The block preview example data.
     *
     * @var array
     */
    public $example = [
        'style' => 'light',
        'title' => 'Hello World',
        'text' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid harum, aliquam repellat officiis dolorum, ducimus perspiciatis ipsa iste accusantium quaerat quis impedit rem.  Odio dolorem enim quam! Molestias, labore!',
        'padding' => [
            'top' => 0,
            'right' => 0,
            'bottom' => 0,
            'left' => 0,
        ],
        'pull' => 0,
        'options' => [
            'flip_horizontal' => false,
            'hide_component' => false
        ]
    ];


    /**
     * Data to be passed to the block before rendering.
     *
     * @return array
     */
    public function with()
    {
        $options = get_field('options') ?: $this->example['options'];

        $style = get_field('style') ?: $this->example['style'];

        $padding = Blocks::getBlockSpacing((get_field('padding')) ?: $this->example['padding'], 'padding');
        $pullValue = (get_field('pull')) ?: $this->example['pull'];
        $pull = "transform: translateY(calc(-1 * var(--spacing-preset-{$pullValue})));";

        return [
            'style' =>  $style,
            'title' => get_field('title') ?: $this->example['title'],
            'text' => get_field('text') ?: $this->example['text'],     
            'padding' => $padding,
            'pull' => $pull,
            'flipLayout' => ($options['flip_horizontal']) ? '[SLUGIFY]__wrap--flip' : '',
            'hide' => $options['hide_component'],
            'options' => $options,
            'preview' => $this->preview
        ];
    }

    /**
     * The block field group.
     *
     * @return array
     */
    public function fields()
    {
        $[CAMEL] = new FieldsBuilder('[CAMEL]');

        $[CAMEL]
            ->addText('title')
            ->addTextArea('text')
            ->addAccordion('negativeMargin', [
                'label' => 'Negative Margin',
            ])
            ->addFields(GlobalFields::getFields('pushPull'))
            ->addAccordion('margin-end')->endpoint()
            ->addAccordion('padding', [
                'label' => 'Padding',
            ])
            ->addFields(GlobalFields::getFields('padding'))
            ->addAccordion('padding-end')->endpoint()
            ->addGroup('options', [
                'label' => 'Options',
                'layout' => 'block'
            ])
            ->addFields(GlobalFields::getFields('flipHorizontal'))
            ->addFields(GlobalFields::getFields('hideComponent'))
            ->addFields(GlobalFields::getFields('componentID'))

            ->endGroup();

        return $[CAMEL]->build();
    }

    /**
     * Assets to be enqueued when rendering the block.
     *
     * @return void
     */
    public function enqueue()
    {
        // if prod and fontend
        if(!Helpers::isDevelopment() && !is_admin()){
            bundle('[CAMEL]', 'frontend')->enqueue();
        }
    }
}
