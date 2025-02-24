<?php

namespace Fir\Pinecones\[CAMEL]\Blocks;

use Log1x\AcfComposer\Block;
use Log1x\AcfComposer\Builder;
use Fir\Lib\Utils\Helpers;
use Fir\Lib\Utils\GlobalFields as GlobalFields;
use Fir\Lib\Utils\Blocks;
use Fir\Lib\Utils\Images;
use Illuminate\Support\Facades\Vite;

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
    public $icon = '[DASHICON]';

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
     * The ancestor block type allow list.
     *
     * @var array
     */
    public $ancestor = [];

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
    * The Block Version
    *
    * @var string
    */
    public $blockVersion = 2;

    /**
    * The API Version
    *
    * @var string
    */
    public $apiVersion = 3;

    /**
     * The supported block features.
     *
     * @var array
     */
    //working on getting this to work public $supports =  Blocks::getBlockSupports($block, $blockSettings);
    public $supports = [
        'align' => true,
        'align_content' => false,
        'full_height' => false,
        'anchor' => true,
        'mode' => false,
        'multiple' => true,
        'jsx' => true,
        'color' => false, // using acf pallete + ACF field instead
        'background' => false, // using acf pallete + ACF field instead
        'html' => true,
        'reusable' => true,
        'customClassName' => true,
        'typography' => true,
        'position' => false,
        'dimensions' => [
            'aspectRatio' => true,
            'minHeight' => true,
            'spacing' => true,
            'border' => true,
        ],
        'spacing' => [
            'blockGap' => true,
        ]
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
     * The block template.
     *
     * @var array
     */
    public $template = [
        // 'core/heading' => ['placeholder' => 'Hello World'],
        // 'core/paragraph' => ['placeholder' => 'Welcome to the Hello block.'],
    ];
    /**
     * The Uses Context.
     *
     * @var array
     */

    public $uses_context = ['acf/fields', 'fir/block'];


    /**
     * Data to be passed to the block before rendering.
     *
     * @return array
     */
    public function with(): array
    {
        $options = get_field('options') ?: $this->example['options'];
        // if $options['animations'] is not set, set it to an empty array
        $options['animations'] = $options['animations'] ?? [
            'animationsItem' => '',
            'animationsComponent' => ''
        ];
        $style = get_field('style') ?: $this->example['style'];

        $padding = Blocks::getBlockSpacing((get_field('padding')) ?: $this->example['padding'], 'padding');
        $pullValue = ($options['pull']) ?: $this->example['pull'];
        $pull = "transform: translateY(calc(-1 * var(--spacing-preset-{$pullValue})));";


        $classes = $this->classes;


        return [
            'style' =>  $style,
            'title' => get_field('title') ?: $this->example['title'],
            'text' => get_field('text') ?: $this->example['text'],     
            'pull' => $pull,
            'class' => $class,
            'textColor' => get_field('textColor'),
            'backgroundColor' => get_field('backgroundColor'),
            'flipLayout' => ($options['flip_horizontal']) ? '[CAMEL]__wrap--flip' : '',
            'hide' => $options['hide_component'],
            'options' => $options,
            'padding' => $options['padding'] ?: '',
            'margin' => $options['margin'] ?: '',
            'hide' => $options['hide_component'],
            'options' => $options,
            'preview' => $this->preview
        ];
    }


    public function fields()
    {        
        $[CAMEL]= Builder::make('[CAMEL]');
        $[CAMEL]
            ->addText('title')
            ->addTextArea('text')
            ->addFields(GlobalFields::getFields('color', 'textColor', 'Text Color'))
            ->addFields(GlobalFields::getFields('color', 'backgroundColor', 'Background Color'))

            ->addGroup('options', [
                'label' => 'Options',
                'layout' => 'block'
            ])
            ->addFields(GlobalFields::getFields('padding'))
            ->addFields(GlobalFields::getFields('margin'))
            ->addFields(GlobalFields::getFields('animation'))
            ->addFields(GlobalFields::getFields('hideComponent'))
            ->addFields(GlobalFields::getFields('pull'))
            ->endGroup();
        return $[CAMEL]->build();
    }

    /**
     * Assets enqueued when rendering the block.
     */
    public function assets(array $block): void
    {
        // if prod and fontend
       // if(!Helpers::isDevelopment() && !is_admin()){
        //    bundle('[CAMEL]', 'frontend')->enqueue();
       // }
    }
}
